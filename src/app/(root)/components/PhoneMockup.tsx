"use client";
import Logo from "@/components/Logo";
import Button from "@/components/ui/Button";
import { useAuthStore } from "@/stores/auth.store";
import { useLinkStore } from "@/stores/link.store";
import Image from "next/image";
import Link from "next/link";
import {
  FaArrowRight,
  FaCodepen,
  FaFacebook,
  FaGithub,
  FaLink,
  FaLinkedin,
  FaYoutube,
} from "react-icons/fa6";

const PhoneMockup = () => {
  const { links } = useLinkStore();
  const { user, loading } = useAuthStore();

  return (
    <div className="w-full flex justify-center py-[100px]">
      <div className="relative h-[630px] w-[300px]">
        <Image
          src="/images/phone-frame.png"
          alt="frame"
          layout="fill"
          objectFit="contain"
          className="absolute inset-0"
        />
        <div className="absolute inset-[24px] inset-x-5 overflow-auto scrollbar-phone p-4 py-10 mt-[20px] mb-[2px]">
          {loading ? (
            <div>Loading...</div>
          ) : user ? (
            <>
              <div className="flex flex-col items-center mb-14">
                <div className="h-[96px] w-[96px] rounded-full mb-6 overflow-hidden border-4 ">
                  <Image
                    src=""
                    alt=""
                    width={300}
                    height={300}
                    className="w-full h-full object-cover"
                  />
                </div>
                {!user?.displayName ? (
                  <Link
                    href="/profile"
                    className="hover:underline text-primary"
                  >
                    Edit name
                  </Link>
                ) : (
                  <p className="mb-2 text-lg font-medium">
                    {user?.displayName}
                  </p>
                )}
                <p className="text-sm text-gray-500">{user.email}</p>
              </div>
              <div className="space-y-4">
                {links.map((link) => (
                  <div
                    key={link.id}
                    className={`relative p-3 px-4 rounded-lg w-full flex justify-between items-center text-white text-sm ${platformColor(
                      link.platform
                    )}`}
                  >
                    <span className="flex gap-2 items-center">
                      {renderIconByPlatform(link.platform)}
                      <span>{link.platform}</span>
                    </span>
                    <FaArrowRight className="ml-2" size={13} />
                  </div>
                ))}
              </div>
            </>
          ) : (
            <div className="flex flex-col">
              <div className="flex justify-center flex-col items-center bg-[#FAFAFA] py-16 rounded-xl">
                <Image
                  src="/icons/devlink-logo.png"
                  alt="solar link cirlce"
                  loading="lazy"
                  width={40}
                  height={40}
                  className="object-cover "
                />
                <h3 className="font-bold text-xl text-[#333333] pt-10 text-center">
                  Sign in an account to get you started
                </h3>
              </div>
              <Link href="/login">
                <Button className="w-full">Login</Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhoneMockup;

const renderIconByPlatform = (platform: string) => {
  switch (platform) {
    case "GitHub":
      return <FaGithub />;
    case "YouTube":
      return <FaYoutube />;
    case "LinkedIn":
      return <FaLinkedin />;
    case "Facebook":
      return <FaFacebook />;
    case "Frontend Mentor":
      return <FaCodepen />;
    default:
      return <FaLink />;
  }
};

const platformColor = (platform: string) => {
  switch (platform) {
    case "GitHub":
      return "bg-gray-800"; // GitHub color
    case "YouTube":
      return "bg-red-600"; // YouTube color
    case "LinkedIn":
      return "bg-blue-700"; // LinkedIn color
    case "Facebook":
      return "bg-blue-600"; // Facebook color
    case "Frontend Mentor":
      return "bg-orange-600"; // Frontend Mentor color
    default:
      return "bg-gray-300"; // Default color
  }
};