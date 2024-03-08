import Image from "next/image"
import FollowButton from "../forms/FollowButton"
import { Button } from "../ui/button"
import Link from "next/link"

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
  visitedId:string
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
  visitedId
} :Props) => {

  return (
    <div className="flex w-full flex-col justify-start">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative h-20 w-20 object-cover">
            <Image 
              src={imgUrl}
              alt="Profile Image"
              fill
              className="rounded-full object-cover shadow-2xl"
            />
          </div>

          <div className="flex-1">
            <h2 className="text-left text-heading3-bold">{name}</h2>
            <p className="text-base-medium text-gray-1">@{username}</p>
          </div>
          <div className="flex gap-5">
            <div className="flex flex-col items-center justify-center">
              <p>{postLength}</p>
              <p>Post{postLength > 1 && "s"}</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{follower.length}</p>
              <p>Follower</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{following.length}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
      <p className="mt-6 max-w-lg text-base-regular">{bio}</p>
      { authUserId !== visitedId ?
        <FollowButton authUser={authUserId} accountId={accountId}  />
        : 
        <Link href="/edit-profile" className="w-full flex justify-center border border-light-2 items-center p-2 bg-light-2 hover:border hover:bg-light-1 rounded-lg">
          Edit Profile
        </Link>
      }
      <div className="mt-12 h-0.5 w-full bg-light-2" />
    </div>
  )
}

export default ProfileHeader