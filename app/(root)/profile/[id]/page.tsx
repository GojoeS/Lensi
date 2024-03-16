import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, followCheck } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from "@/components/ui/constants";
import Image from "next/image";
import FeedsTab from "@/components/shared/FeedsTab";
import LikedTab from "@/components/shared/LikedTab";


async function Page({ params }: {params: {id: string}}) {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  return (
    <section>
      <ProfileHeader 
        accountId={plainUserInfo._id}
        visitedId={params.id}
        authUserId={user.id}
        name={plainUserInfo.name}
        username={plainUserInfo.username}
        imgUrl={plainUserInfo.image}
        bio={plainUserInfo.bio}
        postLength={plainUserInfo.posts.length}
        follower={plainUserInfo.follower}
        following={plainUserInfo.following}
      />

      <div className="my-2">
        <Tabs defaultValue="feeds" className="w-full">
          <TabsList className="tab">
            {profileTabs.map((tab) => (
              <TabsTrigger value={tab.value} key={tab.label}>
                <Image 
                  src={tab.icon}
                  alt={tab.label}
                  width={24}
                  height={24}
                  className="object-contain"
                />
                <p className="max-sm:hidden">{tab.label}</p>
              </TabsTrigger>
            ))}
          </TabsList>         
          <TabsContent value="feeds" className="w-full">
            <FeedsTab 
              accountId={plainUserInfo.id}
            />
          </TabsContent>
          <TabsContent value="liked" className="w-full">
            <LikedTab 
              accountId={plainUserInfo.id}
            />
          </TabsContent>
          <TabsContent value="feed">HAHA</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Page