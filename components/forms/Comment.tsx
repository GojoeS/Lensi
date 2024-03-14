"use client"

import React, { useState } from 'react'
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

  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(CommentValidation),
    defaultValues:{
      comment:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof CommentValidation>) => {
    try {
      setIsLoading(true);
      await addComent({
        parentId: postId, 
        text: values.comment, 
        author: currentUserId, 
        path: pathname
      })
      
    } catch (error:any) {
      throw new Error(`Failed to send comment: ${error.message}`)
    } finally{
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='flex w-full justify-between border-b items-center mb-2'>
          <FormField 
            control={form.control}
            name="comment"
            render={({field }) => (
              <FormItem className='flex w-full items-center gap-2'>
                <FormLabel>
                  <div>
                    <Image 
                      src={currentUserImg} 
                      alt="your profile photo" 
                      width={30} 
                      height={30}
                      className='rounded-full'
                    />

                  </div>
                </FormLabel>
                <div className='pb-4 pt-2 w-full pr-2'>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder='Comment... (max. 200 characters)'   
                      className='text-normal'                
                      {...field}
                    />
                  </FormControl>
                </div>
              </FormItem>
            )}
          />
          <Button type="submit" className='bg-dark-1 hover:bg-gray-500 text-light-1' disabled={isLoading}>
            {isLoading ? "Sending" : "Send"}
          </Button>
        </form>
      </Form>
    </div>
  )
}

export default Comment