import { fetchReplyById } from '@/lib/actions/reply.action'
import Image from 'next/image'
import Link from 'next/link'
import ReplyCard from './ReplyCard';
import { addCreatedDate } from '@/lib/utils';
import { fetchCommentById } from '@/lib/actions/comment.action';
import DeleteButtonComment from '../shared/DeleteButtonComment';

interface Props{
  postId:string,
  comment:any
  currentUser:string
}

const CommentCard = async({
  postId,
  comment,
  currentUser
} : Props
  ) => {

  const comments = await fetchCommentById(comment)
  const commentsPlain = JSON.parse(JSON.stringify(comments));

  return (
    <div className='flex gap-2'>
      <div>
        <Image 
          src={commentsPlain.author.image} 
          alt="photo profile" 
          width={45} 
          height={45} 
          className='rounded-full'
        />
      </div>
      <div className='flex flex-col w-full'>
        <div className='flex w-full items-center justify-between'>
          <div className='flex flex-col'>
            <p className='font-semibold'>{commentsPlain.author.username}</p>
            <p className='text-gray-500 font-[500] text-[12px]'>{addCreatedDate(commentsPlain.createdAt)}</p>
          </div>
          {currentUser == commentsPlain.author._id && ( 
            <DeleteButtonComment contentToDelete={commentsPlain._id} parentId={postId} />
          )}
        </div>
        <p className='mr-12 text-normal'>{commentsPlain.text}</p>
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
                  currentUser={currentUser}
                  parentId={commentsPlain._id}
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