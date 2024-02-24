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

interface Props{
  commentId: string,
  currentUserImg: string,
  currentUserId: string
}

const Reply = ({ commentId, currentUserImg, currentUserId}:Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(ReplyValidation),
    defaultValues:{
      reply:"",
    }
  })

  const onSubmit = async (values: z.infer<typeof ReplyValidation>) => {
    await addReply({
      parentId: commentId, 
      text: values.reply, 
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
            name="reply"
            render={({field }) => (
              <FormItem className='flex w-full items-center gap-2'>
                <FormLabel>
                  <Image src={currentUserImg} alt="your profile photo" width={30} height={24}/>
                </FormLabel>
                <FormControl>
                  <Input 
                    type="text"
                    placeholder='Reply...'
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

export default Reply