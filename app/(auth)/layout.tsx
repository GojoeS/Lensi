import { ClerkProvider } from "@clerk/nextjs"
import { Inter } from "next/font/google"

import '../globals.css';

export const metadata = {
  title: "Lensi",
  description: "A Social media app build on top of Next.js 14"
}

const inter = Inter({ subsets: ["latin"]})

export default function RootLayout({ children }: {children: React.ReactNode}){
  return(
    <ClerkProvider>
      <html lang="en">
        <body className={`${inter.className} bg-light-1`}>
          <div className="main">
            <div className="gradient" />
          </div>
          {children}
        </body>
      </html>
    </ClerkProvider>
  )
}