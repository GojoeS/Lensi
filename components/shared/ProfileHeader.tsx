import Image from "next/image"
import FollowButton from "../forms/FollowButton"
import { Button } from "../ui/button"
import Link from "next/link"
import AccountStats from "../cards/AccountStats"

interface Props{
  accountId:string,
  authUserId:string,
  name:string,
  username:string,
  imgUrl:string,
  bio:string,
  postLength: number,
  follower:string[],
  following:string[],
  visitedId:string,
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  postLength,
  follower,
  following,
  visitedId,
} :Props) => {

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center gap-3 w-full max-md:w-fit">
            <div className="relative h-[70px] w-[70px] object-cover">
              <Image 
                src={imgUrl}
                alt="Profile Image"
                fill
                className="rounded-full object-cover shadow-lg"
              />
            </div>
            <div className="flex-1 max-md:hidden">
              <h2 className="text-left text-heading3-bold max-lg:text-heading4-bold">@{username}</h2>
              <p className="text-base-medium text-gray-1">{name}</p>
            </div>
          </div>
          <AccountStats postLength={postLength} follower={follower} following={following}/>
        </div>
      </div>
      <div className="flex-1 mb-2 mt-4 gap-4 flex flex-col">
        <div className="md:hidden">
          <h2 className="text-left text-heading3-bold max-lg:text-heading4-bold">@{username}</h2>
          <p className="text-base-medium text-gray-1">{name}</p>
        </div>
        <p className="text-base-regular">{bio}</p>
      </div>
      { authUserId !== visitedId ?
        <FollowButton authUser={authUserId} accountId={accountId}/>
        : 
        <Link href="/edit-profile" className="w-full flex justify-center border  border-light-2 items-center p-3 bg-light-2 hover:border hover:bg-light-1 rounded-lg my-2">
          Edit Profile
        </Link>
      }
      <div className="my-4 h-0.5 w-full bg-light-2" />
    </div>
  )
}

export default ProfileHeader