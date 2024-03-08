import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs" 
import { redirect } from "next/navigation";

async function Page(){

  const user = await currentUser();
  if(!user) return null

  const userInfo = await fetchUser(user.id);
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const userData = {
    id: user?.id,
    objectId: plainUserInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }

  return(
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Edit Profile</h1>
      <p className="mt-3 text-base-regular text-dark-4">Update your Lensi profile</p>

      <section className="mt-9 bg-light-1 bg-opacity-70 backdrop-blur-xl p-10 shadow-lg rounded-lg">
        <AccountProfile
          user={userData}
          btnTitle="Continue"
        />
      </section>
    </main>
  )
}

export default Page