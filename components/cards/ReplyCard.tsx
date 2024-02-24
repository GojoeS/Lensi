

import { fetchReplyById } from "@/lib/actions/reply.action"
import Image from "next/image"

interface Props{
  replies:{
    
  }
}

const ReplyCard = async({ replies }:any) => {

  //FETCHING REPLY\

  

  return (   
    <div className='flex gap-2'>
      <div>
        <Image src="/s" alt="photo profile" width={50} height={50} className='rounded-full'/>
      </div>
      <div className='flex flex-col '>
        <p className='font-semibold'></p>
        <p>a</p>
      </div>
    </div>
  )
}

export default ReplyCard