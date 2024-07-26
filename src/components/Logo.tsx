import Image from "next/image";
import React from "react";

const Logo = () => {
  return (
    <div className="flex items-center gap-[10px]">
      <Image
        src="/icons/devlink-logo.png"
        alt="solar link cirlce"
        loading="lazy"
        width={40}
        height={40}
        className="object-contain"
      />
      <p className="font-bold md:text-[28px] text-[24px] hidden md:block">
        devlinks
      </p>
    </div>
  );
};

export default Logo;
