import Link from "next/link"
import Image from "next/image"
import { SignOutButton, SignedIn } from "@clerk/nextjs"

const Topbar = () => {

  return (
    <nav className="topbar md:hidden">
      <Link href="/" className="flex items-center gap-4">
        <Image src="/logo-light.png" alt="logo" width={70} height={78} />
      </Link>

      <div className="flex items-center gap-1">
        <div className="block md:hidden">
          <SignedIn>
            <SignOutButton>
              <div className="flex cursor-pointer">
                <Image src='/icons/exit.svg' alt="logout" width={24} height={24}/>
              </div>
            </SignOutButton>
          </SignedIn>
        </div>
      </div>
    </nav>
  )
}

export default Topbar