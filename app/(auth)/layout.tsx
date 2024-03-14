import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';
import Image from "next/image";

const inter = Inter({ subsets: ["latin"]})

export const metadata = {
  title: "Lensi",
  description: "A Social media app build on top of Next.js 14"
}


export default function RootLayout({ children }: {children: React.ReactNode}){
  return(
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-light-1`}>
          <div className="main">
            <div className="gradient" />
          </div>
          <div className="flex flex-col w-full min-h-screen items-center justify-between">
            <div className="flex flex-col w-full justify-center items-center pt-16 pb-10">            
              <Image
                src="/logo-light.png"
                alt="lensi logo"
                width={100}
                height={100}
                className="mb-10"
              />
              <div className="flex justify-center items-center">
                <Image
                    src="/assets/app-screenshoot.png"
                    alt="lensi logo"
                    width={500}
                    height={500}
                    className="max-lg:hidden"
                  />
                {children}
              </div>
            </div>
            <div className="w-full flex justify-center items-center py-12">
              <p>&copy; Lensi 2024</p>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}