"use client"

import { useForm } from 'react-hook-form'
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostValidation } from '@/lib/validations/post'
import * as z from 'zod'
import Image from 'next/image'
import { ChangeEvent, useState } from 'react'
import { isBase64Image } from '@/lib/utils'
import { useUploadThing } from '@/lib/uploadthing'
import { updateUser } from '@/lib/actions/user.actions'
import { usePathname, useRouter } from 'next/navigation'
import { createPost } from '@/lib/actions/post.action'


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

  const onSubmit = async (values: z.infer<typeof PostValidation>) => {
    // const blob = values.image;

    // const hasImageChanged = isBase64Image(blob);
    // if(hasImageChanged){
    //   const imgRes = await startUpload(files)

    //   if(imgRes && imgRes[0].url){
    //     values.image = imgRes[0].url;
    //   }
    // }

    
    await createPost({ 
      image: values.image, 
      caption: values.caption, 
      tag: values.tag,
      author: userId, 
      path: pathname,
    })
    
    console.log("test oii")
    router.push("/");
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col justify-start gap-10">
        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem className='items-center justify-center gap-4'>
              <FormLabel className=''>
                {field.value ? 
                  (<Image 
                    src={field.value}
                    alt='profile photo'
                    width={96}
                    height={96}
                    priority
                    className='object-contain'
                  />  
                  ) : (
                  ""
                  ) 
                }
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type='file'
                  accept='image/*' 
                  placeholder='Upload a photo'
                  className='shadow-md'
                  onChange={(e) => handleImage(e, field.onChange)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="caption"
          render={({ field }) => (
            <FormItem className='flex flex-col justify-center gap-3'>
              <FormLabel className='text-base-semibold text-dark-2'>
                Caption
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Textarea 
                  rows={10}                
                  className='account-form_input no focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <FormField
          control={form.control}
          name="tag"
          render={({ field }) => (
            <FormItem className='flex flex-col justify-center gap-3'>
              <FormLabel className='text-base-semibold text-dark-2'>
                Tag
              </FormLabel>
              <FormControl className='flex-1 text-base-semibold text-gray-200'>
                <Input 
                  type='text'                  
                  className='account-form_input no focus'
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
            
          )}
        />
        <Button type="submit"className='bg-dark-1 hover:bg-gray-500 text-light-1'>
          Post
        </Button>
      </form>
    </Form>
  )
}

export default PostFeed