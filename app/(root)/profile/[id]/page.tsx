import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from "@/components/ui/constants";
import Image from "next/image";
import FeedsTab from "@/components/shared/FeedsTab";


async function Page({ params }: {params: {id: string}}) {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(params.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  return (
    <section>
      <ProfileHeader 
        accountId={plainUserInfo.id}
        authUserId={user.id}
        name={plainUserInfo.name}
        username={plainUserInfo.username}
        imgUrl={plainUserInfo.image}
        bio={plainUserInfo.bio}
        postLength={plainUserInfo.posts.length}
      />

      <div className="mt-9">
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
          {profileTabs.map((tab) => (
            <TabsContent key={`content-${tab.label}`} value={tab.value}
            className="w-full">
              <FeedsTab 
                currentUserId={user.id}
                accountId={plainUserInfo.id}
                accountType="User"
                postId={plainUserInfo.posts._id}
              />
            </TabsContent>
          ))}
          <TabsContent value="feed">HAHA</TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

export default Page