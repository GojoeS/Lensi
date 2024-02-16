"use client"

import { useUploadThing } from "@/lib/uploadthing"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostValidation } from "@/lib/validations/post"
import { isBase64Image } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import * as z from 'zod'
import { Button } from "@/components/ui/button"

interface PostProps{
  post:{
    objectId: string,
    image: string,
    caption: string,
  }
}

const PostFeed = ({userId} : {userId: string}) => {

  const [file, setfile] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues:{
      caption:"",
      accountId: userId,
      image: "",
    }
  })

  const onSubmit = async(values: z.infer<typeof PostValidation>) => {
    await createPost({

    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField 
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Caption
              </FormLabel>
              <FormControl>
                <Textarea 
                  rows={10}
                  className="resize-none"
                  {...field}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit" className='bg-dark-1 hover:bg-gray-500 text-light-1'>Post</Button>
      </form>
    </Form>
  )
}

export default PostFeed