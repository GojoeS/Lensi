"use server"

import { connectToDB } from "../mongoose";
import Post from "../models/post.model"
import User from "../models/user.model";
import { revalidatePath } from "next/cache";
import Reply from "../models/reply.model";
import Comment from "../models/comment.model";
import Like from "../models/like.model";

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

export async function deletePost({postId, path}: {postId: string, path: string}){

  try {
    connectToDB();

    const post = await Post.findById(postId)
    .populate({ 
      path: "comment", 
      model: Comment,
      select:"_id parentId reply",
      populate: {
        path:"reply",
        model: Reply,
      }
    })

    const author = await User.findById(post.author)

    await User.findByIdAndUpdate(author._id, {
      $pull: {posts: postId},
    });
    
    post.comment.forEach(async(comment:any) => {
      comment.reply.forEach(async(reply:any) => {
        await Reply.findByIdAndDelete(reply._id)
      });

      await Comment.findByIdAndDelete(comment._id)
    });

    //delete like data, and then pull data from user.like
    const like = await Like.find({ parentId: postId })
    .populate({
      path: "author",
      model: User,
      select: "_id name likes"
    })
    
    //delete likes data from user
    like.forEach(async(element) => {
      await User.findByIdAndUpdate(element.author._id,{
        $pull: { likes: element._id}
      })
    });

    await Post.findByIdAndDelete(postId)

    revalidatePath(path)       
  } catch (error:any) {
    throw new Error(`Failed to delete post: ${error.message}`)
  }
}