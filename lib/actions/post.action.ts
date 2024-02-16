import { connectToDB } from "../mongoose";

interface Props{
  image: string,
  text: string,
  author: string,
  path: string,
  tag: string,
}

export async function CreatePost({image, text, author, path}: Props){
  connectToDB();

  const createdPost = await Post.create();
}