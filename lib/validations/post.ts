import * as z from 'zod'

export const PostValidation = z.object({
  caption: z.string().min(0).max(300),
  image: z.string().url().min(1),
  accountId: z.string()
})

export const CommentValidation = z.object({
  comment: z.string().min(1).max(200),
  accountId: z.string()
})