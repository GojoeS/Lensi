"use client"

import React from 'react'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { CommentValidation } from '@/lib/validations/post'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { addComent } from '@/lib/actions/comment.action'

interface Props{
  postId: string,
  currentUserImg: string,
  currentUserId: string
}

const Comment = ({ postId, currentUserImg, currentUserId}:Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues:{
      comment:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    await addComent({
      parentId: postId, 
      text: values.comment, 
      author: currentUserId, 
      path: pathname
    })
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full border justify-between items-center'>
          <FormField 
            control={form.control}
            name="comment"
            render={({field }) => (
              <FormItem className='flex w-full items-center gap-2'>
                <FormLabel>
                  <Image src={currentUserImg} alt="your profile photo" width={30} height={24}/>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="text"
                    placeholder='Comment...'
                    className=''
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-dark-1 hover:bg-gray-500 text-light-1'>
            Send
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Comment