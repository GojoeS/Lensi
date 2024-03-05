"use client"

import React from 'react'
import {
  Form,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LikeValidation } from '@/lib/validations/post'
import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { likePost } from '@/lib/actions/like.action'
import User from '@/lib/models/user.model'
import { fetchUser } from '@/lib/actions/user.actions'

interface Props{
  postId: string,
  authorId: string,
  like: any[],
  currUserLike:string[]
}

const Like = ({ postId, authorId, like, currUserLike}:Props) => {
  const pathname = usePathname();

  const form = useForm({
    resolver: zodResolver(LikeValidation)
  })

  const onSubmit = async () => {
    await likePost({
      postId: postId, 
      authorId: authorId, 
      path:pathname,
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} >
        <Button type="submit" size="none">
          {
            currUserLike.includes(postId) ?
            <Image src='/icons/heart-fill.svg' alt="like button" width={24} height={24} />           
            :
            <Image src='/icons/heart.svg' alt="like button" width={24} height={24} />           
          }         
        </Button>
      </form>
    </Form>
  )
}

export default Like