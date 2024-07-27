import React from "react";

const PageHeader: React.FC<{
  title: string;
  desc: string;
}> = ({ title, desc }) => {
  return (
    <div className="mb-10">
      <h1 className="text-3xl font-semibold mb-2">{title}</h1>
      <p className="text-gray-500 text-base">{desc}</p>
    </div>
  );
};

export default PageHeader;
