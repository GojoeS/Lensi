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
import { deletePost } from "@/lib/actions/post.action";

import Image from "next/image"
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

interface Props{
  postId: string;
}

const DeleteButtonPost = ({ postId } :Props) => {

  const pathname = usePathname();
  const router = useRouter();

  const submitDelete = async () => {
    await deletePost({
      postId: postId,
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
            This action cannot be undone. This will permanently delete your post
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-green-500">Cancel</AlertDialogCancel>
          <AlertDialogAction 
            className="text-red-500" 
            onClick={() => { 
              submitDelete();
              router.push("/");
            }}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default DeleteButtonPost