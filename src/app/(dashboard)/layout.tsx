import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.scss";
import { Toaster } from "sonner";
import NextTopLoader from "nextjs-toploader";
import { Suspense } from "react";
import { Providers } from "../providers";
import Header from "@/components/Header";
import PhoneMockup from "./components/PhoneMockup";
import Loader from "@/components/Loader";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Link Sharing App",
  description: "Generated by create next app",
};

export default function DashboardLayout({
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
        <Toaster position="top-right" richColors theme="system" closeButton />
        <Providers>
          <Suspense fallback={<Loader />}>
            <Header />
            <div className="bg-gray-50 min-h-dvh">
              <div className="container mx-auto px-2 md:px-0 grid lg:grid-cols-5 grid-cols-1 gap-6 py-6 md:pt-0">
                <div className="col-span-2 hidden lg:flex">
                  <div className="bg-white shadow-sm rounded-xl w-full">
                    <PhoneMockup />
                  </div>
                </div>
                <div className="lg:col-span-3 col-span-1">
                  <div className="bg-white md:shadow-sm rounded-xl w-full h-full">
                    {children}
                  </div>
                </div>
              </div>
            </div>
          </Suspense>
        </Providers>
      </body>
    </html>
  );
}