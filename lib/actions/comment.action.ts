"use server"

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import Post from "../models/post.model"
import { connectToDB } from "../mongoose"
import User from "../models/user.model";

interface Props{
  parentId:string,
  text:string, 
  author:string, 
  path:string
}

export async function addComent({parentId, text, author, path}: Props){
  connectToDB()

  try {

    const post = await Post.findById(parentId);

    if(!post){
      throw new Error("Post not found")
    }

    const comment = await new Comment({
      text: text,
      author: author,
      parentId: parentId,
    })

    const savedComment= await comment.save()

    post.comment.push(savedComment._id);

    await post.save()

    revalidatePath(path)
    
  } catch (error: any) {
    throw new Error(`Error adding comment: ${error.message}`)
  }
}

export async function fetchComment(userId: string){
  connectToDB()

  try {
    const comment = await Comment.find({id: userId})
    .populate({ path: "author", model: User})

    return comment
  } catch (error:any) {
    throw new Error(`Error fetch comment: ${error.message}`)
  }
}

export async function fetchCommentById(commentId: string){
  connectToDB();

  try{

    const comment = await Comment.findById(commentId)
    .populate({ path: "author", model: User})
    
    return comment;
  }
  catch(error:any){
    throw new Error(`Failed to fetch post by id: ${error.message}`)
  }
}