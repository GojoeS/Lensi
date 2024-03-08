import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';

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
          <div className="flex flex-col w-full min-h-screen items-center justify-between border">
            <div className="flex w-full justify-center border items-center pt-20 pb-10">
              <p className="max-lg:hidden">Foto Lensi</p>
              <div className="flex flex-col justify-center items-center border">
                <p>Lensi</p>
                {children}
              </div>
            </div>
            <div className="border w-full flex justify-center items-center py-12">
              <p>TRADE MARK</p>
            </div>
          </div>
        </body>
      </html>
    </ClerkProvider>
  )
}