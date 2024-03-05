import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { fetchPostById } from '@/lib/actions/post.action'
import Link from 'next/link'
import Image from 'next/image'
import CommentCard from '@/components/cards/CommentCard'
import { addCreatedDate } from '@/lib/utils'
import Like from '@/components/forms/Like'


export default async function commentLayout({
children, params
}: Readonly<{
  children: React.ReactNode;
  params: {id: string}
}>) {

  if (!params.id) return null

  const user = await currentUser()
  if(!user) return null

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect("/onboarding")
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const post = await fetchPostById(params.id)
  const plainpost = JSON.parse(JSON.stringify(post));
  
  return (
    <article>
      <div className='flex bg-white rounded-lg shadow-lg py-4 px-2 min-w-[400px] 
      max-w-[540px] justify-center items-center'>
        <div className='flex flex-col gap-4'>
          <Link href={`/profile/${plainpost.author.id}`}>
            <div className='flex items-center my-2 gap-2'>
              <Image 
                src={plainpost.author.image}
                alt="profile image"
                width={45}
                height={45}
                className='rounded-full'
              />
              <p className='font-bold'>{plainpost.author.name}</p>
            </div>
          </Link>
          <Image src={plainpost.image} alt="post's image" width={500} height={500}/>
          <div className='flex gap-3'>
            <Like 
              postId={plainpost._id}
              authorId={plainUserInfo._id}
              like={JSON.parse(JSON.stringify(post.like))}
              currUserLike={plainUserInfo.likes}
            />
            <Link href={`/post/${plainpost._id}`}>
              <Image src='/icons/comment.svg' alt="like button" width={24} height={24} />   
            </Link>
          </div>
          {
          post.like.length > 0 && (
            <p className='font-semibold'>{post.like.length} like{post.like.length > 1 && "s"}</p>
          )}
          <h3>{plainpost.caption}</h3>
          {plainpost.tag && <p className='text-blue'>{plainpost.tag}</p>  }       
          <p className='text-gray-500 font-[500]'>{addCreatedDate(plainpost.createdAt)}</p>
          {children}
          {
            post.comment.map((value:any) => //map by post.comment
              {
                return(  
                  <CommentCard  
                    key={value}
                    comment={value}
                    postId={plainpost._id}
                  />
                )
              }
            )
          }
        </div>
      </div>
    </article>
  )
}
