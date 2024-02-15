import { UserButton } from "@clerk/nextjs"

const RightSidebar = () => {
  return (
    <section className="rightsidebar">
      <div className="flex flex-1 flex-col justify-start items-center p-5 rounded-2xl bg-light-1.5 ">
        <h3 className="text-heading4-medium">Switch Account</h3>
        <div className="flex justify-between items-center">
          <div className="flex flex-1 justify-center items-center gap-3">
            <UserButton afterSignOutUrl="/"/>
            <div>
              <p>Thomas Farel</p>
              <p>@username</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col justify-start items-center">
        <h3 className="text-heading4-medium">Suggested Account</h3>
      </div>
    </section>
  )
}

export default RightSidebar