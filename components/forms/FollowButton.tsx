"use client"

import React from 'react'
import { Button } from "@/components/ui/button"
import { updateFollow } from '@/lib/actions/user.actions'
import { usePathname } from 'next/navigation'

interface Props{
  authUser: string,
  accountId: string
}

const FollowButton = ({authUser, accountId}: Props) => {

  const pathname = usePathname();

  const handleFollow = async({ authUser, accountId }:Props) => {
    await updateFollow({
      authUser: authUser, 
      accountId: accountId,
      path: pathname,
    })
  }

  return (
    <Button size="none" variant="default" onClick={() => handleFollow({authUser, accountId})} 
      className='border py-2'
    >
      Follow
    </Button>
  )
}

export default FollowButton