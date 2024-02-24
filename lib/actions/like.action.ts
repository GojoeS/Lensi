"use server"

import Like from "../models/like.model";
import { connectToDB } from "../mongoose";

interface Props{
  author: string | null
}

export async function likePost({ author }:Props){
  connectToDB();


  try{
    const LikedPost = await Like.create({
      author
    })

    

  } catch(error:any){
    throw new Error(`Failed to like post: ${error.message}`)
  }
}