import AccountProfile from "@/components/forms/AccountProfile"
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs" 
import { redirect } from "next/navigation";

async function Page(){

  const user = await currentUser();
  if(!user) return null

  const userInfo = await fetchUser(user.id);
  if (userInfo?.onboarded) redirect("/");

  const userData = {
    id: user?.id,
    objectId: userInfo?._id,
    username: userInfo?.username || user?.username,
    name: userInfo?.name || user?.firstName || "",
    bio: userInfo?.bio || "",
    image: userInfo?.image || user?.imageUrl,
  }

  return(
    <main className="mx-auto flex max-w-3xl flex-col justify-start px-10 py-20">
      <h1 className="head-text">Onboarding</h1>
      <p className="mt-3 text-base-regular text-dark-4">Complete your profile now to use Lensi</p>

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