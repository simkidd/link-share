"use client";
import { useAuthStore } from "@/stores/auth.store";
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

const PreviewComp = () => {
  const { links } = useLinkStore();
  const { user, loading } = useAuthStore();

  return (
    <div>
      <div className="flex flex-col items-center mb-14">
        <div className="h-[120px] w-[120px] rounded-full mb-6 overflow-hidden border-4 ">
          <Image
            src=""
            alt=""
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>

        <h3 className="mb-2 text-3xl font-medium">{user?.displayName}</h3>

        <p className="text-sm text-gray-500">{user?.email}</p>
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
  );
};

export default PreviewComp;

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
