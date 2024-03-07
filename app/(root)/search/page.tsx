import ProfileHeader from "@/components/shared/ProfileHeader";
import { fetchUser, fetchUsers } from "@/lib/actions/user.actions";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import UserCard from "@/components/cards/UserCard";
import Searchbar from "@/components/shared/Searchbar";
import { fetchPosts } from "@/lib/actions/post.action";
import PostCard from "@/components/cards/PostCard";
import Link from "next/link";
import Image from "next/image";

const Page = async({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) => {

  const explore = await fetchPosts()

  const user = await currentUser();
  if (!user) return null;

  const userInfo = await fetchUser(user.id)
  if (!userInfo?.onboarded) redirect('/onboarding')
  const plainUserInfo = JSON.parse(JSON.stringify(userInfo));

  const result = await fetchUsers({
    userId: user.id,
    searchString: searchParams.q,
    sortBy: "desc"
  })

  return (
    <section>
      <h1 className="head-text mb-10">Search</h1>

      <Searchbar routeType='search' />

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

        <section className='mt-9 grid grid-cols-3 max-sm:gap-1 gap-4 w-full'>
          {
            explore?.posts.length === 0 ? (
              <p>No post found</p>
            ) : (
              <>
              {explore?.posts.map((post:any) => (
                <Link href={`/post/${post._id}`} key={post._id}>
                  <div className='relative aspect-square h-auto w-auto'>            
                    <Image src={post.image} alt="post" fill
                      className=" object-cover"
                    />
                  </div>
                </Link>
              ))}  
              {/* {
                explore?.posts.map((post) => (
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
                ))
              } */}
              </>
            )
          }
        </section>
      </div>
    </section>
  )
}

export default Page