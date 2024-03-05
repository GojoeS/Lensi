import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { likePost } from '@/lib/actions/like.action'
import { addCreatedDate } from '@/lib/utils'
import Like from '../forms/Like'

interface Props{
  id: string,
  currentUserId: string,
  comment: {
    author: {
      image:string,
      name:string,
      text:string
    }
  }[],
  image: string,
  caption: string,
  tag: string,
  author: {
    name: string,
    image: string,
    id: string,
  },
  createdAt: string,
  like:any,
  currUserLike: string[],
}

const PostCard = ({ 
  id,
  currentUserId,
  comment,
  image,
  caption,
  tag,
  author,
  createdAt, 
  like,
  currUserLike
}: Props) => {

  const date = new Date(createdAt);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr" , "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  const plainPost = JSON.parse(JSON.stringify(id));
  const plainUser = JSON.parse(JSON.stringify(currentUserId));

  return (
    <article>
      <div className='flex bg-white rounded-lg shadow-lg py-4 px-2 min-w-[400px] 
      max-w-[540px] justify-center items-center'>
        <div className='flex flex-col gap-2'>
          <Link href={`/profile/${author.id}`}>
            <div className='flex items-center my-2 gap-2'>
              <Image 
                src={author.image}
                alt="profile image"
                width={45}
                height={45}
                className='rounded-full'
              />
              <p className='font-bold'>{author.name}</p>
            </div>
          </Link>
          <Image src={image} alt="post's image" width={500} height={500}/>
          <div className='flex gap-3'>
            <Like 
              postId={plainPost}
              authorId={plainUser}
              like={JSON.parse(JSON.stringify(like))}
              currUserLike={currUserLike}
            />
            <Link href={`/post/${id}`}>
              <Image src='/icons/comment.svg' alt="like button" width={24} height={24} />   
            </Link>
          </div>
          {
            like.length > 0 && (
            <p className='font-semibold'>{like.length} like{like.length > 1 && "s"}</p>
            )
          }
          <h3>{caption}</h3>
          <p className='text-blue'>{tag && tag}</p>
          {
            comment.length > 0 && (
              <Link href={`/post/${id}`}>
                <p>{`View all ${comment.length} comments `}</p>
              </Link>
            )
          }
          <p className='text-gray-500 font-[500]'>{addCreatedDate(createdAt)}</p>
        </div>
      </div>
    </article>
  )
}

export default PostCard