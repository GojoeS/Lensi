interface Props{
  postLength:number,
  follower:number,
  following:number
}

const AccountStats = ({postLength, follower, following}: Props) => {
  return (
    <div className="flex gap-5 max-sm:w-full max-md:items-center justify-evenly w-full ">
      <div className="flex flex-col items-center justify-center">
        <p className="text-body-semibold">{postLength}</p>
        <p className="text-body-normal">Post{postLength > 1 && "s"}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-body-semibold">{follower}</p>
        <p className="text-body-normal">Follower{follower > 1 && "s"}</p>
      </div>
      <div className="flex flex-col items-center justify-center">
        <p className="text-body-semibold">{following}</p>
        <p className="text-body-normal">Following</p>
      </div>
    </div>
  )
}

export default AccountStats