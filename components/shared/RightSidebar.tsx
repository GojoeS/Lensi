import { UserButton } from "@clerk/nextjs"
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/cards/PostCard";

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
    <section className="rightsidebar border">
      <div className="flex flex-1 flex-col justify-start rounded-2xl bg-light-1.5 ">
        <h3 className="text-heading4-medium">Switch Account</h3>
        <div className="flex justify-start">
          <div className="flex flex-1 gap-3">
            <UserButton afterSignOutUrl="/"/>
            <div>
              <p>Thomas Farel</p>
              <p>@username</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start ">
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
                personType="User"
              />
            ))}
          </>
        )}
      </div>
    </section>
  )
}

export default RightSidebar