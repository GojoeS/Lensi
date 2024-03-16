"use server"

import { revalidatePath } from "next/cache";
import Comment from "../models/comment.model";
import { connectToDB } from "../mongoose"
import User from "../models/user.model";
import Reply from "../models/reply.model";
import Post from "../models/post.model";

interface Props{
  parentId:string,
  text:string, 
  author:string, 
  path:string
}

export async function addReply({parentId, text, author, path}: Props){
  connectToDB()

  try {

    const comment = await Comment.findById(parentId);

    if(!comment){
      throw new Error("Comment not found")
    }

    const reply = await new Reply({
      text: text,
      author: author,
      parentId: parentId,
    })

    const savedReply= await reply.save()

    comment.reply.push(savedReply._id);

    await comment.save()

    revalidatePath(path)
    
  } catch (error: any) {
    throw new Error(`Error adding reply: ${error.message}`)
  }
}

export async function fetchReply(userId: string){
  connectToDB()

  try {
    const reply = await Reply.find({id: userId})
    .populate({ path: "author", model: User})

    return reply
  } catch (error:any) {
    throw new Error(`Error fetch comment: ${error.message}`)
  }
}

export async function fetchReplyById(replyId: string){
  connectToDB();

  try{

    const reply = await Reply.findById(replyId)
    .populate({ path: "author", model: User})
    
    return reply;
  }
  catch(error:any){
    throw new Error(`Failed to fetch reply by id: ${error.message}`)
  }
}

export async function deleteReply({replyId, parentId, path}: {replyId: string, parentId: string, path: string}){
  try {
    connectToDB();

    const comment = await Comment.findById( parentId )
    
    await Comment.findByIdAndUpdate(parentId, {
      $pull: {reply: replyId}
    });
    await Reply.findByIdAndDelete(replyId);

    comment.save()

    revalidatePath(path)
  } catch (error: any) {
    throw new Error(`Failed to delete reply: ${error.message}`)
  }
}

