'use client'

import { sidebarLinks } from '@/components/ui/constants'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation' 
import { SignOutButton, SignedIn, useAuth } from '@clerk/nextjs'

const LeftSidebar = () => {

  const router = useRouter();
  const pathname = usePathname();
  const { userId } = useAuth();

 
  
  return (
    <section className="custom-scrollbar leftsidebar">
      
      <Link href="/" className="flex items-center pl-10 mt-[-70px] pb-12">
        <Image src="/logo-light.png" alt="logo" width={70} height={78} />
      </Link>

      <div className="flex w-full flex-1 flex-col gap-6 px-6">
        {sidebarLinks.map((link) => {
          
          const isActive =  (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

          if(link.route === '/profile') link.route = `${link.route}/${userId}`

          return(
            <Link 
              href={link.route}
              key={link.label}
              className={`leftsidebar_link ${isActive && 'left-active'}`}
              onClick={() => router.refresh()}
            >
              <Image src={link.imgURL} alt={link.label} width={24} height={24} />
              <p className='text-dark-1 max-lg:hidden'>{link.label}</p>
            </Link>
          )
        })}
      </div>

      <div className='mt-40 px-6'>
        <SignedIn>
          <SignOutButton signOutCallback={() => router.push('/')}>
            <div className="flex cursor-pointer gap-4 p-6">
              <Image src='/icons/exit.svg' alt="logout" width={24} height={24}/>
              <p className='max-lg:hidden text-red-500'>Logout</p>
            </div>
          </SignOutButton>
        </SignedIn>
      </div>
    </section>
  )
}

export default LeftSidebar