import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { profileTabs } from "@/components/ui/constants";
import Image from "next/image";
import FeedsTab from "@/components/shared/FeedsTab";
import UserCard from "@/components/cards/UserCard";

const Page = async() => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const result = await fetchUsers({
    userId: user.id,
    searchString: '',
    sortBy: "desc"
  })

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <div className="mt-14 flex flex-col gap-9">
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ): (
          <>
            {result.users.map((user) => (
              <UserCard 
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default Page