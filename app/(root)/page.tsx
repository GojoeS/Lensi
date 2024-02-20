import { UserButton } from "@clerk/nextjs";
import { fetchPosts} from '@/lib/actions/post.action'
import { currentUser } from "@clerk/nextjs";
import PostCard from "@/components/cards/PostCard";

export default async function Home() {

  const result = await fetchPosts()

  const user = await currentUser();


  return (
    <div className="h-screen">
      <h1 className="head-text text-left">Home</h1>
      <section className="mt-9 flex flex-col gap-10">
        {
          result?.posts.length === 0 ? (
            <p>No post found</p>
          ) : (
            <>
            {
              result?.posts.map((post) => (
                <PostCard 
                  key={post._id}
                  id={post._id}
                  currentUserId={user?.id || ""}
                  comment={post.comment}
                  image={post.image}
                  caption={post.caption}
                  tag={post.tag}
                  author={post.author}
                  createdAt={post.createdAt}
                />
              ))
            }
            </>
          )
        }
      </section>
    </div>
  )
}