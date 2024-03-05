import { fetchUser, getCommentActivity } from "@/lib/actions/user.actions";
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

  const commentActivity = await getCommentActivity(userInfo._id)

  const sortedActivity = commentActivity.comments
    .concat(commentActivity.likes)
    .sort((a, b) => b.createdAt - a.createdAt);


  return (
    <section>
      <h1 className="head-text mb-10">Notification</h1>

      <section className="mt-10 flex flex-col gap-5">
        {commentActivity.comments.length > 0 || commentActivity.likes.length > 0 ? (
          <>
            {sortedActivity.map((activity:any) => {
              if(userInfo.posts.includes(activity.parentId._id)){
                return(
                  <Link key={activity._id} href={`/post/${activity.parentId._id}`} >
                    <article className="activity-card justify-between">
                      { 
                        <>
                          <div className="flex gap-2" >
                            <div className="flex gap-2 flex-1">
                              <Image 
                                src={activity.author.image}
                                alt="Profile Picture"
                                width={20}
                                height={20}
                                className="rounded-full object-cover"
                              />
                                <p className="border h-6 overflow-hidden">{activity.author.name} {activity.text ? "commented" : "liked"} your post</p>
                              
                            </div>
                            <p className="text-gray-400 font-medium">{getTimePassedString(activity.createdAt)}</p>
                          </div>
                          <Image 
                            src={activity.parentId.image}
                            alt="Profile Picture"
                            width={30}
                            height={30}
                            className="rounded-full object-cover ml-2"
                          />
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