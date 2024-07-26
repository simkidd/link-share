"use client";
import { useLinkStore } from "@/stores/link.store";
import Image from "next/image";
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
            <p className="mb-2 text-lg font-medium">Your name</p>
            <p className="text-sm text-gray-500">Your email</p>
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
