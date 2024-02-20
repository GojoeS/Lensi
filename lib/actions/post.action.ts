"use server"

import { connectToDB } from "../mongoose";
import Post from "../models/post.model"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";

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
  catch(error){

  }
}