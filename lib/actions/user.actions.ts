"use server"

import { revalidatePath } from "next/cache";
import User from "../models/user.model";
import { connectToDB } from "../mongoose"
import Post from "../models/post.model";
import { FilterQuery, SortOrder } from "mongoose";
import { cp } from "fs";
import Comment from "../models/comment.model";
import Like from "../models/like.model";

interface Props{
  userId: string, 
  username: string, 
  name: string, 
  bio: string, 
  image: string,
  path: string
}

export async function updateUser({
  userId,
  username, 
  name, 
  bio, 
  image,
  path,
}:Props ): Promise<void>{

  connectToDB();

  try{
    await User.findOneAndUpdate(
      {id: userId},
      {
        username: username.toLowerCase(),
        name,
        bio,
        image,
        onboarded: true
      },
      { upsert: true }
    );

  
    if(path === '/profile/edit'){
      revalidatePath(path)
    }
  } catch(error: any){
    throw new Error(`Failed to create/update User: ${error.message}`)
  }
}

export async function fetchUser(userId: string){
  try{
    connectToDB();

    return await User.findOne({ id: userId })

  } catch (error: any){
    throw new Error(`Failed to fetch user: ${error.message}`)
  }
}

export async function fetchUserPosts(userId: string){
  connectToDB;
  try {
    const user = await User.findOne({ id: userId })
    .populate({
      path: "posts",
      model: Post,
      select: 'image _id createdAt'
    })

    return user.posts
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`)
  }
}

export async function fetchUserLikes(userId: string){
  connectToDB;

  try {
    const user = await User.findOne({ id: userId })
    .populate({
      path: "likes",
      model: Like,
      select: 'parentId createdAt',
      populate:{
        path: "parentId",
        model: Post,
        select: "image _id"
      }
    })

    return user.likes
  } catch (error: any) {
    throw new Error(`Failed to fetch user posts: ${error.message}`)
  }
}

export async function fetchUsers({ 
  userId,
  searchString = "" ,
  sortBy= "desc"
}: {
  userId: string;
  searchString?: string;
  sortBy: SortOrder;
}){
  try {
    connectToDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      id: {$ne: userId}
    };

    if(searchString.trim() !== ""){
      query.$or =[
        { username: { $regex: regex }},
        { name: { $regex: regex }}
      ]
    }

    const sortOptions = { createdAt: sortBy};
    const usersQuery = User.find(query).sort(sortOptions)

    const users = await usersQuery.exec()

    return {users}

  } catch (error:any) {
    throw new Error(`Failed to search: ${error.message}`)
  }
}

export async function getAllActivity(userId: string){

  try {
    connectToDB()

    const userPosts = await Post.find({ author: userId })
    .populate({
      path: "like",
      model: User,
      select: "name image _id"
    });

    const commentedPostIds =  userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.comment)
    }, [])

    const comments = await Comment.find({
      commentedPostIds,
      author: { $ne: userId }
    })
    .populate([
      {
        path: 'author',
        model: User,
        select: 'name image _id'
      },
      {     
        path: "parentId",
        model: Post,
        select: "image"      
      }
    ])

    const likedPostIds =  userPosts.reduce((acc, userPost) => {
      return acc.concat(userPost.like)
    }, [])
    

    const likes = await Like.find({
      likedPostIds,
      author: { $ne: userId }
    })
    .populate([
      {
        path: 'author',
        model: User,
        select: 'name image _id'
      },
      {     
        path: "parentId",
        model: Post,
        select: "image"      
      }
    ])

    const userFollower = await User.findOne({ _id: userId })
    .populate({
      path: "follower._id",
      model: User,
      select: "_id name username image"
    })

    const follower = userFollower.follower

    return {comments, likes, follower}

  } catch (error:any) {
    throw new Error(`Failed to fetch activity: ${error.message}`)
  }
}

export async function updateFollow({ authUser, accountId, path}: {authUser:string, accountId:string, path: string}){
  try {
    connectToDB()

    const currentUser = await User.findOne({id: authUser})
    const visitedAccount = await User.findById(accountId)
    
    const isFollowing = currentUser.following.some((following:any) => following.equals(visitedAccount._id));
    
    if(isFollowing){
      currentUser.following.pull(visitedAccount._id)
      visitedAccount.follower.pull(currentUser._id)
    }
    else{
      currentUser.following.push(visitedAccount._id)
      visitedAccount.follower.push(currentUser._id)
    }

    await currentUser.save()
    await visitedAccount.save()

    revalidatePath(path)
  } catch (error:any) {
    throw new Error(`Failed to update follow: ${error.message}`)
  }
}

export async function followCheck({ authUser, accountId }: { authUser:string, accountId:string } ){
  try {
    connectToDB()
    const currentUser = await User.findOne({id: authUser})
    const visitedAccount = await User.findById(accountId)
    
    return currentUser.following.includes(visitedAccount._id);
  } catch (error:any) {
    throw new Error(`Error adding checking like: ${error.message}`)
  }
}