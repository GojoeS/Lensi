import { UserButton } from "@clerk/nextjs";
import { fetchPosts} from '@/lib/actions/post.action'
import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/PostCard";
import { redirect } from 'next/navigation'
import { fetchUser } from "@/lib/actions/user.actions";

export default async function Home() {

  const result = await fetchPosts()

  const user = await currentUser();
  if(!user) return redirect("/sign-in")

  const userInfo = await fetchUser(user.id)
  if(!userInfo?.onboarded) redirect("/onboarding")
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  let totalPost = 0;

  return (
    <div>
      <section className="flex flex-col gap-10 items-center">
        {
          result?.posts.length === 0 ? (
            <p>No post found</p>
          ) : (
            <>
            {
              result?.posts.map((post) => {
                if(plainUserInfo._id == post.author._id || userInfo.following.some((follow:any) => follow._id.toString() === post.author._id.toString()) ){
                  totalPost += 1
                  return(
                    <PostCard 
                      key={post._id}
                      id={post._id}
                      currentUserId={plainUserInfo._id}
                      comment={post.comment}
                      image={post.image}
                      caption={post.caption}
                      tag={post.tag}
                      author={post.author}
                      createdAt={post.createdAt}
                      like={post.like}
                      currUserLike={plainUserInfo.likes}
                    />
                  )
                }
                totalPost > 0 && <p>No post found</p>
              })
            }
            </>
          )
        }
      </section>
    </div>
  )
}