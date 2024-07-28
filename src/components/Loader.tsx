import Image from "next/image";
import React from "react";

const Loader = () => {
  return (
    <div className="min-h-dvh flex items-center justify-center">
      <div className="animate-pulse">
        <Image
          src="/icons/devlink-logo.png"
          alt="solar link cirlce"
          loading="lazy"
          width={40}
          height={40}
          className="object-contain"
        />
      </div>
    </div>
  );
};

export default Loader;
