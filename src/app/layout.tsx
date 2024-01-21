import type {Metadata} from "next";

import {Inter} from "next/font/google";
import clsx from "clsx";

import {Header} from "@/components/ui/header";
import {Footer} from "@/components/ui/footer";
import {Toaster} from "@/components/ui/sonner";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    template: "ShortTiny | %s",
    default: "ShortTiny - URL Shortener",
  },
  description: "Shorten your URLs easily and quickly",
  keywords: ["short urls", "url", "link", "link short", "shorten"],
  icons: "http://localhost:3000/favicon.ico",
};

const inter = Inter({subsets: ["latin"]});

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "dark grid h-full min-h-screen w-full grid-rows-[auto,1fr,auto] bg-background  font-sans antialiased pattern-hive-gray-500/20 pattern-hive-scale-50",
          inter.className,
        )}
      >
        <Header />
        <main className="px-40 py-8">
          {children}
          <Toaster richColors position="top-center" />
        </main>
        <Footer />
      </body>
    </html>
  );
}
