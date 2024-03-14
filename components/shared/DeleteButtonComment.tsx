"use client"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteComment } from "@/lib/actions/comment.action";

import { deleteReply } from "@/lib/actions/reply.action";

import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props{
  contentToDelete: string;
  parentId:string;
}

const DeleteButtonComment = ({contentToDelete, parentId} :Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const submitDelete = async () => {
    await deleteComment({
      commentId: contentToDelete, 
      parentId: parentId,
      path: pathname
    })
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger>
        <div className='delete-img-container'>
          <Image 
            src="/icons/trash.png"
            alt="delete"
            width={16}
            height={16}
          />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent  className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your comment
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-green-500">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="text-red-500" 
            onClick={() => { 
              submitDelete();
              router.push(`/post/${parentId}`);
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButtonComment