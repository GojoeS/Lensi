
import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { fetchPostById } from '@/lib/actions/post.action'
import Comment from '@/components/forms/Comment'

const Page = async ({ params }: {params: {id: string}}) => {
  if (!params.id) return null

  const user = await currentUser()
  if(!user) return null

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect("/onboarding")
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));


  const post = await fetchPostById(params.id)
  const plainpost = JSON.parse(JSON.stringify(post));

  return (
    <section>
      <div> 
        <Comment 
          postId={plainpost._id}
          currentUserImg={plainUserInfo.image}
          currentUserId={plainUserInfo._id}
        />
      </div>
    </section>
  )
}

export default Page