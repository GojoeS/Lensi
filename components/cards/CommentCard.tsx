import { fetchReplyById } from '@/lib/actions/reply.action'
import Image from 'next/image'
import Link from 'next/link'
import ReplyCard from './ReplyCard';
import { addCreatedDate } from '@/lib/utils';
import { fetchCommentById } from '@/lib/actions/comment.action';

interface Props{
  // authorPhoto:string,
  // authorName:string,
  // commentText:string,
  postId:string,
  // commentId:string,
  // reply:string[],
  // date: any
  comment:any
}

const CommentCard = async({
  // authorPhoto,
  // authorName,
  // commentText,
  postId,
  // commentId,
  // reply,
  // date
  comment
} : Props
  ) => {

  const comments = await fetchCommentById(comment) // sebelumnya fetch comment
  const commentsPlain = JSON.parse(JSON.stringify(comments));

  return (
    <div className='flex gap-2'>
      <div>
        <Image src={commentsPlain.author.image} alt="photo profile" width={50} height={50} className='rounded-full'/>
      </div>
      <div className='flex flex-col '>
        <div>
          <p className='font-semibold'>{commentsPlain.author.username}</p>
          <p className='text-gray-500 font-[500] text-[12px]'>{addCreatedDate(commentsPlain.createdAt)}</p>
        </div>
        <p>{commentsPlain.text}</p>
        <Link href={`/post/${postId}/${commentsPlain._id}}`}>
          <p className='font-semibold text-gray-700 text-[14px]'>Reply</p>                 
        </Link>
        <div className='flex-col gap-2'>
        
        {
          comments.reply.map((index:any) => 
            (
              <ReplyCard 
                key={index}
                replyId={index}
              />
            )
          )
        }
        </div>
      </div>
    </div>
  )
}

export default CommentCard