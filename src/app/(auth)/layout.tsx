import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { Toaster } from "sonner";
import Link from "next/link";
import Logo from "@/components/Logo";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { Providers } from "../providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Generated by create next app",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextTopLoader
          color="#633CFF"
          initialPosition={0.08}
          crawlSpeed={200}
          height={3}
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
        />
        <Toaster position="top-right" richColors theme="system" />
        <Providers>
          <Suspense fallback={<div>Loading...</div>}>
            <div className="md:bg-gray-50 bg-white">
              <div className="flex flex-col items-center md:justify-center min-h-screen md:py-12 py-8 container mx-auto px-2">
                <Link href="/">
                  <Logo />
                </Link>
                <div className="bg-white rounded-xl md:shadow-sm md:w-[500px] w-full md:px-10 px-5 md:py-10 py-3 mt-[50px]">
                  {children}
                </div>
              </div>
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}
