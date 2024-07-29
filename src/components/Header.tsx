"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import Button from "./ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import { FaEye, FaLink } from "react-icons/fa6";
import { BiUserCircle } from "react-icons/bi";
import { LogOut } from "lucide-react";

const Header = () => {
  const { user, logout } = useAuthStore();
  const pathname = usePathname();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const isActive = (href: string) => {
    return (
      href === pathname ||
      href === pathname?.replace(/\/$/, "") ||
      pathname?.startsWith(href + "/")
    );
  };

  return (
    <div className="w-full shadow-sm bg-gray-50 md:py-6">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between bg-white md:rounded-xl">
        <Link href="/">
          <Logo />
        </Link>
        <div className="flex gap-4 items-center">
          <Link
            href="/editor"
            className={`flex gap-2 items-center md:px-[27px] p-[11px] rounded-lg text-[#737373] hover:text-primary transition-colors duration-300 ease-in-out ${
              isActive("/editor") ? "bg-primary-100 text-primary" : ""
            } `}
          >
            <FaLink size={18} />
            <span className="hidden md:block">Links</span>
          </Link>
          <Link
            href="/profile"
            className={`flex gap-2 items-center md:px-[27px] p-[11px] rounded-lg text-[#737373] hover:text-primary transition-colors duration-300 ease-in-out ${
              isActive("/profile") ? "bg-primary-100 text-primary" : ""
            } `}
          >
            <BiUserCircle size={20} />
            <span className="hidden md:block">Profile Details</span>
          </Link>
        </div>

        <div className="flex items-center gap-4">
          {isLoading ? (
            <div className="size-11 rounded-lg bg-gray-300 animate-pulse"></div>
          ) : (
            user && (
              <div className="">
                <button onClick={logout} className="text-red-500 p-[11px]">
                  <LogOut size={20} />
                </button>
              </div>
            )
          )}

          <Link href={`/preview/${user?.uid}`}>
            <Button
              variant="outline"
              className="flex gap-2 items-center px-[11px] md:px-[27px]"
            >
              <FaEye size={16} />
              <span className="hidden md:block">Preview</span>
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Header;
