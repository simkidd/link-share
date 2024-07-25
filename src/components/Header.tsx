"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./ui/Button";

const Header = () => {
  const pathname = usePathname();

  const isActive = (href: string) => {
    return (
      href === pathname ||
      href === pathname?.replace(/\/$/, "") ||
      pathname?.startsWith(href + "/")
    );
  };

  return (
    <div className="w-full shadow bg-white rounded-xl ">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo />
        <div className="flex gap-2 items-center">
          <Link
            href="/"
            className={`flex gap-2 items-center px-[27px] py-[11px] rounded-lg text-[#737373] hover:text-primary transition-colors duration-300 ease-in-out ${
              isActive("/") ? "bg-primary-200 text-primary" : ""
            } `}
          >
            {/* <FaLink size={18} /> */}
            <span>Link</span>
          </Link>
          <Link
            href="/profile"
            className={`flex gap-2 items-center px-[27px] py-[11px] rounded-lg text-[#737373] hover:text-primary transition-colors duration-300 ease-in-out ${
              isActive("/profile") ? "bg-primary-200 text-primary" : ""
            } `}
          >
            {/* <BiUserCircle size={28} /> */}
            <span>Profile Details</span>
          </Link>
        </div>
        <div>
          <Link href="">
            <Button variant="outline">Preview</Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
