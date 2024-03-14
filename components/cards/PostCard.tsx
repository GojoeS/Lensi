import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { likePost } from '@/lib/actions/like.action'
import { addCreatedDate } from '@/lib/utils'
import Like from '../forms/Like'
import DeleteButtonPost from '../shared/DeleteButtonPost'

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
    _id: string
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

  const plainPostId = JSON.parse(JSON.stringify(id));
  const plainUser = JSON.parse(JSON.stringify(currentUserId));

  return (
    <article>
      <div className='post-card'>
        <div className='flex flex-col gap-2'>
          <div className='flex justify-between'>
            <Link href={`/profile/${author.id}`}>
              <div className='flex items-center my-2 gap-2'>
                <Image 
                  src={author.image}
                  alt="profile image"
                  width={40}
                  height={40}
                  className='rounded-full'
                />
                <p className='font-bold'>{author.name}</p>
              </div>
            </Link>
            { author._id == currentUserId && <DeleteButtonPost postId={plainPostId} /> }
          </div>
          <Image src={image} alt="post's image" width={500} height={500}/>
          <div className='flex gap-3'>
            <Like 
              postId={plainPostId}
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
          <p className='text-normal'>{caption}</p>
          <p className='text-blue text-normal'>{tag && tag}</p>
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