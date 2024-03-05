

import { fetchReplyById } from "@/lib/actions/reply.action"
import { addCreatedDate } from "@/lib/utils"
import { Console } from "console"
import Image from "next/image"

interface Props{
  replyId:string
}

const ReplyCard = async({   
  replyId }:Props) => {

  const replies = await fetchReplyById(replyId)
    
  return (   
    <div className='flex gap-2 my-2' key={replies._id}>
      <div>
        <Image src={replies.author.image} alt="photo profile" width={50} height={50} className='rounded-full'/>
      </div>
      <div className='flex flex-col'>
        <div className='flex gap-2 justify-center items-center'>
          <p className='font-semibold'>{replies.author.username}</p>
          <p className='text-gray-500 font-[500] text-[12px]'>{addCreatedDate(replies.createdAt)}</p>
        </div>
        <p>{replies.text}</p>
      </div>
    </div>
  )
}

export default ReplyCard