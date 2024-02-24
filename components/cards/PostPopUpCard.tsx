import Image from 'next/image'
import Link from 'next/link'
import { likePost } from '@/lib/actions/like.action'
import Comment from '../forms/Comment'
import { fetchComment } from '@/lib/actions/comment.action'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import ReplyCard from './ReplyCard'
import { fetchReplyById } from '@/lib/actions/reply.action'

interface Props{
  id: string,
  currentUserId: string,
  comments: {
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
  currentUserImg: string
}

const PostPopUpCard = async({ 
  id,
  currentUserId,
  comments,
  image,
  caption,
  tag,
  author,
  createdAt, 
  currentUserImg
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

  const handleLike = async() =>{
    await likePost({
      author: currentUserId,

    })
  }

  const comment = await fetchComment(id)


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
          <div>
            
          </div>       
          <p className='text-gray-500 font-[500]'>{formattedDateTime}</p>
          <Comment 
            postId={id}
            currentUserImg={currentUserImg}
            currentUserId={currentUserId}
          />
          {
            comment.map(async (value) => {
              
              const replies = await fetchReplyById(value.reply)
              const plainReplies = JSON.parse(JSON.stringify(replies));
              
              return(
              <div className='flex gap-2' key={value.id}>
                <div>
                  <Image src={value.author.image} alt="photo profile" width={50} height={50} className='rounded-full'/>
                </div>
                <div className='flex flex-col '>
                  <p className='font-semibold'>{value.author.username}</p>
                  <p>{value.text}</p>
                  <Link href={`/post/${id}/${value._id}}`}>
                    <p className='font-semibold text-gray-700 text-[14px]'>Reply</p>                 
                  </Link>
                  <div>
                    { value.reply !== null && (                       
                      <ReplyCard 
                        replies={plainReplies} />
                    )}
                  </div>
                </div>
              </div>
            )})
          }
        </div>
      </div>
    </article>
  )
}

export default PostPopUpCard