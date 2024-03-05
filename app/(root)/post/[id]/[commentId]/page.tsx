import React from 'react'
import { currentUser } from '@clerk/nextjs'
import { fetchUser } from '@/lib/actions/user.actions'
import { redirect } from 'next/navigation'
import { fetchPostById } from '@/lib/actions/post.action'
import { fetchCommentById } from '@/lib/actions/comment.action'
import ReplyComment from '@/components/cards/ReplyComment'
import Reply from '@/components/forms/Reply'

const Page = async ({ params }: {params: {id: string, commentId:string}}) => {
  if (!params.id) return null

  const user = await currentUser()
  if(!user) return null

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect("/onboarding")
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));


  const post = await fetchPostById(params.id)
  const plainpost = JSON.parse(JSON.stringify(post));

  const comment = await fetchCommentById(params.commentId.replace("%7D", ""))
  const plainComment = JSON.parse(JSON.stringify(comment));
  
  return(
    <section>
      <div>
        <Reply 
          commentId={plainComment._id}
          currentUserId={plainUserInfo._id}
          currentUserImg={plainUserInfo.image}
        />
      </div>
    </section>
  )
}

export default Page
