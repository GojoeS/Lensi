"use client"

import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { fetchUser, followCheck, updateFollow } from '@/lib/actions/user.actions'
import { usePathname } from 'next/navigation'

interface Props{
  authUser: string,
  accountId: string,
}

const FollowButton = ({authUser, accountId}: Props) => {

  const [isFollowing, setIsFollowing] = useState(false);
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchFollowStatus = async () => {
      const isFollow = await followCheck({ authUser: authUser, accountId: accountId,})
      setIsFollowing(isFollow.isFollowing)
    };

    fetchFollowStatus();
  });
  
  const handleFollow = async({ authUser, accountId }:Props) => {
    try {
      setIsLoading(true);
      await updateFollow({
        authUser: authUser, 
        accountId: accountId,
        path: pathname,
      })      
    } catch (error:any) {
      throw new Error(`error update Follow: ${error.message}`)
    } finally{
      setIsLoading(false);
    }
    
  }
  return (
    <Button size="none" variant={isFollowing ? `default` : `secondary`} onClick={() => handleFollow({authUser, accountId})} 
      className='border py-2'
      disabled={isLoading}
    >     
      {isFollowing ? 'Followed' : 'Follow'}
    </Button>
  )
}

export default FollowButton