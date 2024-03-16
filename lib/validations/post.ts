import * as z from 'zod'
import { isBase64Image } from "@/lib/utils";

export const PostValidation = z.object({
  image: z.string().min(1).refine(isBase64Image, { message: 'Must be a valid image' }),
  caption: z.string(),
  tag: z.string(),
  accountId: z.string()
})

export const CommentValidation = z.object({
  comment: z.string().min(1).max(200),
})

export const ReplyValidation = z.object({
  reply: z.string().min(1).max(200),
})

export const LikeValidation = z.object({
  // accountId: z.string()
})