import React from "react";

const SkeletonMockup = () => {
  return (
    <div className="space-y-4 animate-pulse">
      <div className="flex flex-col items-center mb-14">
        <div className="h-[96px] w-[96px] rounded-full mb-6 overflow-hidden border-4 bg-gray-300"></div>
        <div className="h-4 bg-gray-300 rounded w-1/4 mb-2"></div>
        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
      </div>
      <div className="space-y-4">
        {[1, 2, 3].map((_, index) => (
          <div
            key={index}
            className="relative p-3 px-4 rounded-lg w-full flex justify-between items-center text-white text-sm bg-gray-300"
          >
            <span className="flex gap-2 items-center">
              <div className="h-4 w-4 rounded-full"></div>
              <div className="h-4 rounded w-1/4"></div>
            </span>
            <div className="h-4 w-4 rounded-full ml-2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkeletonMockup;
