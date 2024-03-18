"use server"

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import Post from "../models/post.model"
import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import Reply from "../models/reply.model";

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

export async function deleteComment({commentId, parentId, path}: {commentId: string, parentId: string, path: string}){
  try {
    connectToDB();

    const post = await Post.findById( parentId )
    const allReplies = await Comment.findById(commentId).select("reply")
    const replyToDelete = allReplies.reply

    //delete all repliess

    replyToDelete.forEach(async(element:any) => {
      await Reply.findByIdAndDelete(element);
    });
    
    await Post.findByIdAndUpdate(parentId, {
      $pull: {comment: commentId},
    });

    await Comment.findByIdAndDelete(commentId);

    post.save()

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to delete comments: ${error.message}`)
  }
}

export async function fetchReplyLength({commentId}:{commentId:string}){
  const reply = await Comment.findById(commentId)

}