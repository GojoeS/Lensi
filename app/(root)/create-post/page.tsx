
import PostFeed from "@/components/forms/PostFeed";
import { fetchUser } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

async function Page(){

  const user = await currentUser();

  if (!user) return null;

  const userInfo = await fetchUser(user.id)

  if (!userInfo?.onboarded) redirect('/onboarding')

  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  return (
    <>
      <h1 className="head-text">Create Post</h1>

      <PostFeed userId={userInfo._id} />
    </>
  )
}

export default Page;