import "@/styles/globals.css";
import { Metadata, Viewport } from "next";
import { Link } from "@nextui-org/link";
import clsx from "clsx";
import { GeistSans } from "geist/font/sans";
import { FaPlaneDeparture } from "react-icons/fa";

import { Providers } from "./providers";

import { siteConfig } from "@/app/siteConfig";
import { fontSans } from "@/app/fonts";
import { Navbar } from "@/app/navbar";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next"

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
        <Analytics />
        <SpeedInsights />
        <Providers themeProps={{ attribute: "class", defaultTheme: "light" }}>
          <div className="relative flex flex-col h-screen text-foreground bg-background">
            <Navbar />
            <main className="container mx-auto max-w-7xl px-6 flex-grow">
              {children}
            </main>
            <footer className="w-full flex flex-col items-center justify-top py-10">
              <FaPlaneDeparture className="text-5xl my-5" />
              <div className="flex flex-col justify-top items-center gap-4 md:flex-row md:justify-center my-5">
                {siteConfig.navItems.map((item) => {
                  return (
                    <Link key={item.href} href={item.href}>
                      {item.label}
                    </Link>
                  );
                })}
              </div>
              <Link href="https://github.com/ColinHermack/aviation-blog/blob/main/LICENSE">
                MIT Licensed
              </Link>
            </footer>
          </div>
        </Providers>
      </body>
    </html>
  );
}
