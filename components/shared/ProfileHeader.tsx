import Image from "next/image"

interface Props{
  accountId:string,
  authUserId:string,
  name:string,
  username:string,
  imgUrl:string,
  bio:string,
  postLength: number
}

const ProfileHeader = ({
  accountId,
  authUserId,
  name,
  username,
  imgUrl,
  bio,
  postLength
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
              <p>{postLength}</p>
              <p>Follower</p>
            </div>
            <div className="flex flex-col items-center justify-center">
              <p>{postLength}</p>
              <p>Following</p>
            </div>
          </div>
        </div>
      </div>
        <p className="mt-6 max-w-lg text-base-regular">{bio}</p>
        <div className="mt-12 h-0.5 w-full bg-light-2" />
    </div>
  )
}

export default ProfileHeader