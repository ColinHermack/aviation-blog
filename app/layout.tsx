import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";

import { Providers } from "./providers";

import { siteConfig } from "@/app/siteConfig";
import { fontSans } from "@/app/fonts";
import { Navbar } from "@/app/navbar";

import { FaPlaneDeparture } from "react-icons/fa";

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`,
  },
  description: siteConfig.description,
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning className={GeistSans.className} lang="en">
      <head />
      <body
        className={clsx(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable,
        )}
      >
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen text-foreground bg-background">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-top py-10">
              <Link 
              href='https://github.com/ColinHermack/aviation-blog/blob/main/LICENSE'
              >
                MIT Licensed
              </Link>
              <FaPlaneDeparture className='text-5xl my-10'/>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
