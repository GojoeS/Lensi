"use server"

import { connectToDB } from "../mongoose";
import Post from "../models/post.model"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Reply from "../models/reply.model";

interface Props{
  image: string,
  caption: string,
  tag: string,
  author: string,
  path: string,
}

export async function createPost({image, caption, tag, author, path}: Props){
  connectToDB();

  try{
    const createdPost = await Post.create({
      image,
      caption,
      tag,
      author,
    });
  
    await User.findByIdAndUpdate(author,{
      $push: { posts: createdPost._id}
    })
  
    revalidatePath(path);
  } catch(error:any){
    throw new Error(`Failed to Post: ${error.message}`)
  }
}

export async function fetchPosts(){
  try{
    connectToDB();

    const postsQuery = Post.find({})
      .sort({ createdAt: 'desc'})
      .populate({path: 'author', model: User})

    const posts = await postsQuery.exec();

    return { posts }
  }
  catch(error:any){
    throw new Error(`Failed to fetch posts: ${error.message}`)
  }
}

export async function fetchPostById(id: string){
  connectToDB();

  try{

    const post = await Post.findById(id)
    .populate({ path: "author", model: User, select: "_id id name image" })
    .exec()
    
    return post;
  }
  catch(error:any){
    throw new Error(`Failed to fetch post by id: ${error.message}`)
  }
}