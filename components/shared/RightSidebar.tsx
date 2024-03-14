import { UserButton } from "@clerk/nextjs"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/cards/PostCard";
import Image from "next/image";

const RightSidebar = async() => {

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const result = await fetchUsers({
    userId: user.id,
    searchString: "",
    sortBy: "desc"
  })

  const shuffledUsers = result.users.sort(() => Math.random() - 0.5);

  const suggestedUsers = shuffledUsers.slice(0, 6);

  return (
    <section className="rightsidebar">
      <div className="rightsidebar-container">
        <h3 className="text-heading4-medium">Your Account</h3>
        <div className="flex justify-start">
          <div className="flex flex-1 gap-2 items-center">
            <div className="relative h-10 w-10 object-cover">
              <Image 
                src={plainUserInfo.image}
                alt="Profile Image"
                fill
                className="rounded-full object-cover shadow-2xl"
              />
            </div>
            <div>
              <p className="font-semibold text-[16.5px]">@{plainUserInfo.username}</p>
              <p className="text-small-medium text-[16px] text-gray-1">{plainUserInfo.name}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="rightsidebar-container">
        <h3 className="text-heading4-medium">Suggested Account</h3>
        {result.users.length === 0 ? (
          <p className="no-result">No users</p>
        ): (
          <>
            {suggestedUsers.map((user) => (
              <UserCard 
                key={user.id}
                id={user.id}
                name={user.name}
                username={user.username}
                imgUrl={user.image}
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default RightSidebar