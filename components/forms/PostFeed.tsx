"use client"

import { useUploadThing } from "@/lib/uploadthing"
import { ChangeEvent, useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { PostValidation } from "@/lib/validations/post"
import { isBase64Image } from "@/lib/utils"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import * as z from 'zod'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createPost } from "@/lib/actions/post.action"


const PostFeed = ({userId} : {userId: string}) => {

  const [files, setFiles] = useState<File[]>([])
  const { startUpload } = useUploadThing("media")
  const pathname = usePathname()
  const router = useRouter()

  const form = useForm({
    resolver: zodResolver(PostValidation),
    defaultValues:{
      caption:"",
      accountId: userId,
      image: "",
      tag: "",
    }
  })

  const handleImage = (e: ChangeEvent<HTMLInputElement>, fieldChange: (value:String) => void) =>{
    e.preventDefault();

    const fileReader = new FileReader();

    if(e.target.files && e.target.files.length > 0){
      const file = e.target.files[0];

      setFiles(Array.from(e.target.files))

      if(!file.type.includes("image")) return

      fileReader.onload = async(e) => {
        const imageDataUrl = e.target?.result?.toString() || "";
        fieldChange(imageDataUrl)

      }

      fileReader.readAsDataURL(file)
    }
  }

  const onSubmit = async(values: z.infer<typeof PostValidation>) => {
    await createPost({ 
      image: values.image, 
      caption: values.caption, 
      tag:"",
      author: userId, 
      path: pathname,
    })
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="mt-10"
      >
        <FormField 
          control={form.control}
          name="image"
          render={({field}) => (
            <FormItem>
              <FormLabel>
                Image
              </FormLabel>
              <FormControl>
                <Input
                  type="file"
                  accept="image/*"
                  placeholder="Upload your image"
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
            </FormItem>
          )}
        />
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
        <FormField 
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem>
              <FormLabel>
                Tag
              </FormLabel>
              <FormControl>
                <Input 
                  type="text"
                  {...field}
                  className=""
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