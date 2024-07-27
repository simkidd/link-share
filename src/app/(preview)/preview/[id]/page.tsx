import React from "react";
import Link from "next/link";
import Button from "@/components/ui/Button";
import PreviewComp from "../components/PreviewComp";

const PreviewPage = () => {
  return (
    <div className="w-full">
      <div className="flex gap-4 items-center justify-between container mx-auto px-2 py-4">
        <Link href="/">
          <Button variant="outline">Back to Editor</Button>
        </Link>
        <Button>Share Link</Button>
      </div>
      <div className="py-[60px]">
        <PreviewComp />
      </div>
    </div>
  );
};

export default PreviewPage;
