/* eslint-disable react/no-unescaped-entities */
import Image from "next/image";
import React from "react";

const Placeholder = () => {
  return (
    <div className="flex justify-center flex-col items-center bg-[#FAFAFA] py-16 lg:px-[100px] md:px-12 px-8 rounded-xl">
      <Image
        src="/images/Group 273.png"
        alt="vector"
        height={250}
        width={250}
        className="md:w-[249px] w-[130px]"
      />
      <h3 className="font-bold md:text-[32px] text-2xl text-[#333333] pt-10 pb-6">
        Let's Get you Started
      </h3>
      <p className="font-normal text-base text-[#737373] text-center">
        Use the “Add new link” button to get started. Once you have more than
        one link, you can reorder and edit them. We’re here to help you share
        your profiles with everyone!
      </p>
    </div>
  );
};

export default Placeholder;
