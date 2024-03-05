'use client'

import { sidebarLinks } from "@/components/ui/constants"
import Link from "next/link";
import Image from "next/image";

import { usePathname, useRouter } from "next/navigation";

const Bottombar = () => {

  const pathname = usePathname();
  const route = useRouter();

  return (
    <section className="bottombar">
      <div className="bottombar_container">
        {sidebarLinks.map((link) => {
            
            const isActive =  (pathname.includes(link.route) && link.route.length > 1) || pathname === link.route;

            return(
              <Link 
                href={link.route}
                key={link.label}
                className={`leftsidebar_link ${isActive && 'bg-white'}`}
              >
                <Image src={link.imgURL} alt={link.label} width={24} height={24} />
                <p className='text-dark-1 max-lg:hidden'>{link.label}</p>
              </Link>
            )
          })}
      </div>
    </section>
  )
}

export default Bottombar