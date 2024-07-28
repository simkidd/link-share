"use client";
import Button from "@/components/ui/Button";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PreviewHeader = () => {
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyPageUrl = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.info("URL Copied to clipboard");
  };

  return (
    <div className="flex gap-4 items-center justify-between container mx-auto px-2 py-4">
      <Link href="/editor">
        <Button variant="outline">Back to Editor</Button>
      </Link>
      <Button onClick={copyPageUrl}>Share Link</Button>
    </div>
  );
};

export default PreviewHeader;
