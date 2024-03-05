"use server"

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import { connectToDB } from "../mongoose";
import User from "../models/user.model";
import Like from "../models/like.model";

interface Props{
  postId:string,
  authorId:string, 
  path:string
}

export async function likePost({ postId, authorId, path }:Props){
  connectToDB();

  try{

    const post = await Post.findById(postId)
    const author = await User.findById(authorId)

    const existingLike = await Like.findOne({ parentId: postId, author: authorId });

    if (existingLike){

      await Like.findByIdAndDelete(existingLike._id);

      await Post.findByIdAndUpdate(postId, {
        $pull: {like: authorId}
      });
      await User.findByIdAndUpdate(authorId,{
        $pull: { likes: existingLike._id}
      })
    }

    else{      
      const like = await new Like({
        author: authorId,
        parentId: postId,
      })
      const savedLike = await like.save()

      post.like.push(savedLike.author)
      author.likes.push(savedLike._id)
    }

    await post.save()
    await author.save()

    revalidatePath(path)
    
  } catch (error: any) {
    throw new Error(`Error adding like: ${error.message}`)
  }
}

export async function likeCheck({ postId, authorId }:Props){
  try {
    connectToDB()
    return await Like.findOne({ parentId: postId, author: authorId });
  } catch (error:any) {
    throw new Error(`Error adding checking like: ${error.message}`)
  }
}