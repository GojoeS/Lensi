

import { fetchUserPosts } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import Link from 'next/link';

interface Props{
  currentUserId:string, 
  accountId:string, 
  accountType:string,
  postId: string
}

const FeedsTab = async({currentUserId, accountId, accountType, postId}: Props) => {

  let result = await fetchUserPosts(accountId);
  
  if(!result) redirect("/")

  return (
    <section className='mt-9 grid grid-cols-3 max-sm:gap-1 gap-4 w-full border justify-between object-cover'>
      {result.posts.map((post:any) => (
        <Link href={`/post/${post._id}`} key={post._id}>
          <div>            
            <Image src={post.image} alt="post" width={300} height={300}/>
          </div>
        </Link>
      ))}      
    </section>
  )
}

export default FeedsTab