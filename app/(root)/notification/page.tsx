import { fetchUser, getAllActivity } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import Image from "next/image";
import UserCard from "@/components/cards/UserCard";
import Link from "next/link";
import { getTimePassedString } from "@/lib/utils";

const Page = async() => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const allActivity = await getAllActivity(userInfo._id)

  const sortedActivity = allActivity.comments
    .concat(allActivity.likes, allActivity.follower)
    .sort((a, b) => b.createdAt - a.createdAt);

  return (
    <section>
      <h1 className="head-text mb-10">Notification</h1>

      <section className="mt-10 flex flex-col gap-5">
        {allActivity.comments.length > 0 || allActivity.likes.length > 0 || allActivity.follower.length > 0 ? (
          <>
            {sortedActivity.map((activity:any) => {
              
              if(activity.parentId && userInfo.posts.includes(activity.parentId._id) || !activity.parentId && activity._id._id !== userInfo._id){
                return(
                  <Link key={activity._id} href={activity.parentId ? `/post/${activity.parentId._id}` : `/${activity._id}`} >
                    <article className="activity-card justify-between">
                      { 
                        <>
                          <div className="flex gap-2" >
                            <div className="flex gap-2 flex-1">
                              <div className="relative h-[25px] w-[25px] object-cover">
                                <Image 
                                  src={ activity.author ? activity.author.image : activity._id.image }
                                  alt="Profile Image"
                                  fill
                                  className="rounded-full object-cover shadow-lg"
                                />
                              </div>
                              <p className="h-6 overflow-hidden">{activity.author ? activity.author.name : activity._id.name} {activity.text ? "commented your post" : activity.author ? "liked your post" : "follows you"}</p>                            
                            </div>
                            <p className="text-gray-400 font-medium">{getTimePassedString(activity.createdAt)}</p>
                          </div>
                          {activity.parentId && 
                            <div className="relative h-[30px] w-[30px] object-cover">
                              <Image 
                                src={activity.parentId.image}
                                alt="Profile Image"
                                fill
                                className="rounded-full object-cover shadow-lg"
                              />
                            </div>
                          }
                        </>
                      }
                    </article>
                  </Link>
                )
              }
            })}
          </>
        ): <p className="!text-base-regular">No Notification yet</p>}
      </section>
    </section>
  )
}

export default Page