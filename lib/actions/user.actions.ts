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
    const post = await User.findOne({ id: userId })
    .populate({
      path: "posts",
      model: Post,
      select: 'image _id'
    })

    return post
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
    }

    if(searchString.trim() !== ""){
      query.$or =[
        {username: { $regex: regex }},
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

export async function getCommentActivity(userId: string){

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

    return {comments, likes}

  } catch (error:any) {
    throw new Error(`Failed to fetch activity: ${error.message}`)
  }
}