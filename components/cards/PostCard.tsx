import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import PostPopUpCard from './PostPopUpCard'
import { likePost } from '@/lib/actions/like.action'

interface Props{
  id: string,
  currentUserId: string | null,
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
}: Props) => {

  const date = new Date(createdAt);
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr" , "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ]

  //BUAT FORMAT TANGGAL:
  const year = date.getFullYear();
  const month = date.getMonth();
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  const formattedDateTime = `${year} ${monthNames[month]} ${day} - ${hours}:${minutes}`;

  const isPopUp = false;

  const handleLike = async() =>{
    await likePost({
      author: currentUserId,

    })
  }
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
            <Image src='/icons/heart.svg' alt="like button" width={24} height={24} />
            <Link href={`/post/${id}`}>
              <Image src='/icons/comment.svg' alt="like button" width={24} height={24} />   
            </Link>
          </div>
          <h3>{caption}</h3>
          <p className='text-blue'>{tag && tag}</p>
          {
            comment.length > 0 && (
              <Link href={`/post/${id}`}>
                <p>{`View all ${comment.length} comments `}</p>
              </Link>
            )
          }
          <p className='text-gray-500 font-[500]'>{formattedDateTime}</p>
        </div>
      </div>
      
      
    </article>
  )
}

export default PostCard