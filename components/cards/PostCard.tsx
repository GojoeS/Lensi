import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

interface Props{
  id: string,
  currentUserId: string | null,
  comment: {
    author: {
      image:string,
      name:string,
      text:string
    }
  }[],
  image: string,
  caption: string,
  tag: string,
  author: {
    name: string,
    image: string,
    id: string,
  },
  createdAt: string,
}

const PostCard = ({ 
  id,
  currentUserId,
  comment,
  image,
  caption,
  tag,
  author,
  createdAt, 
}: Props) => {
  return (
    <article>
      <Link href={`/profile/${author.id}`}>
        <Image 
          src={author.image}
          alt="profile image"
          width={30}
          height={30}
          className='rounded-full'
        />
        <p>{author.name}</p>
      </Link>
      <Image src={image} alt="post's image" width={50} height={50}/>
      <h3>{caption}</h3>
      {
        comment.length > 0 ? "ada" : "gada"
      }
    </article>
  )
}

export default PostCard