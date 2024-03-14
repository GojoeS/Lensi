

import { fetchReplyById } from "@/lib/actions/reply.action"
import { addCreatedDate } from "@/lib/utils"
import Image from "next/image"
import DeleteButtonReply from "../shared/DeleteButtonReply"

interface Props{
  replyId:string
  currentUser:string,
  parentId:string
}

const ReplyCard = async({   
  replyId, currentUser, parentId }:Props) => {

  const replies = await fetchReplyById(replyId)
  const repliesPlain = JSON.parse(JSON.stringify(replies));
    
  return (   
    <div className='flex gap-2 my-2' key={replies._id}>
      <div>
        <Image 
          src={replies.author.image} 
          alt="photo profile" 
          width={42} 
          height={42} 
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <p className='font-semibold'>{replies.author.username}</p>
            <p className='text-gray-500 font-[500] text-[12px]'>{addCreatedDate(replies.createdAt)}</p>
          </div>
          {currentUser == repliesPlain.author._id && ( 
            <DeleteButtonReply contentToDelete={repliesPlain._id} parentId={parentId} />
          )}
        </div>
        <p className='mr-12 text-normal'>{replies.text}</p>
      </div>
    </div>
  )
}

export default ReplyCard