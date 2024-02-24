

import PostPopUpCard from '@/components/cards/PostPopUpCard'
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { fetchPostById } from '@/lib/actions/post.action'
import { fetchComment } from '@/lib/actions/comment.action'

const Page = async ({ params }: {params: {id: string}}) => {
  if (!params.id) return null

  const user = await currentUser()
  if(!user) return null

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect("/onboarding")
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));


  const post = await fetchPostById(params.id)
  const plainpost = JSON.parse(JSON.stringify(post));

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


  const comment = await fetchComment(plainpost._id)


  return (
    <section>
      <div>
        <PostPopUpCard 
          key={plainpost._id}
          id={plainpost._id}
          currentUserId={plainUserInfo._id}
          currentUserImg={plainUserInfo.image}
          comments={plainpost.comment}
          image={plainpost.image}
          caption={plainpost.caption}
          tag={plainpost.tag}
          author={plainpost.author}
          createdAt={plainpost.createdAt}
        />
      </div>
    </section>
  )
}

export default Page