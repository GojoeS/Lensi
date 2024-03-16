import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import UserCard from "./UserCard"

interface Props{
  postLength:number,
  follower:any,
  following:any
}

const AccountStats = ({postLength, follower, following}: Props) => {
  return (
    <div className="flex gap-5 max-sm:w-full max-md:items-center justify-evenly w-full ">
      <div className="flex flex-col items-center justify-center">
        <p className="text-body-semibold">{postLength}</p>
        <p className="text-body-normal">Post{postLength > 1 && "s"}</p>
      </div>
      <Dialog >
        <DialogTrigger asChild>
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <p className="text-body-semibold">{follower.length}</p>
            <p className="text-body-normal">Follower{follower.length > 1 && "s"}</p>
          </div>      
        </DialogTrigger>
        <DialogContent className="bg-light-1 px-10">
          <div className="h-[70vh] pt-6">
            <div className="w-full h-full overflow-y-scroll custom-scrollbar flex flex-col gap-10">
              {
                follower.map((i:any) => (
                  <UserCard key={i._id._id} id={i._id._id} name={i._id.name} username={i._id.username} imgUrl={i._id.image} />
                ))
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
      <Dialog>
        <DialogTrigger asChild>
          <div className="flex flex-col items-center justify-center cursor-pointer">
            <p className="text-body-semibold">{following.length}</p>
            <p className="text-body-normal">Following</p>
          </div>
        </DialogTrigger>
        <DialogContent className="bg-light-1 px-10">
          <div className="h-[70vh] pt-10">
            <div className="w-full pr-1 h-full overflow-y-scroll custom-scrollbar flex flex-col gap-5">
              {
                following.map((i:any) => (
                  <UserCard key={i._id._id} id={i._id._id} name={i._id.name} username={i._id.username} imgUrl={i._id.image} />
                ))
              }
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default AccountStats