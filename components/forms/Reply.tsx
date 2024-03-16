"use client"

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
import { ReplyValidation } from '@/lib/validations/post'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { usePathname, useRouter } from 'next/navigation'
import Image from 'next/image'
import { addReply } from '@/lib/actions/reply.action'
import { useState } from "react"

interface Props{
  commentId: string,
  currentUserImg: string,
  currentUserId: string
}

const Reply = ({ commentId, currentUserImg, currentUserId}:Props) => {

  const [isLoading, setIsLoading] = useState(false);

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ReplyValidation),
    defaultValues:{
      reply:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof ReplyValidation>) => {
    try {
      setIsLoading(true);
      await addReply({
        parentId: commentId, 
        text: values.reply, 
        author: currentUserId, 
        path: pathname
      })
    } catch (error:any) {
      throw new Error(`Failed to send reply: ${error.message}`)
    } finally{
      setIsLoading(false);
      form.reset();
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className='comment-reply-container'>
          <FormField 
            control={form.control}
            name="reply"
            render={({field }) => (
              <FormItem className='flex w-full items-center gap-2'>
                <FormLabel>
                  <div>
                    <Image 
                      src={currentUserImg} 
                      alt="your profile photo" 
                      width={30} 
                      height={24}
                      className="rounded-full"
                    />
                  </div>
                </FormLabel>
                <div className='pb-4 pt-2 w-full pr-2'>
                  <FormControl>
                    <Input 
                      type="text"
                      placeholder='Reply... (max. 200 characters)'                   
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

export default Reply