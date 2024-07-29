"use client";
import Button from "@/components/ui/Button";
import { User } from "@/interfaces/user.interface";
import { useAuthStore } from "@/stores/auth.store";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const PreviewHeader: React.FC<{ user: User }> = ({ user }) => {
  const { user: authUser } = useAuthStore();
  const [pageUrl, setPageUrl] = useState("");

  useEffect(() => {
    setPageUrl(window.location.href);
  }, []);

  const copyPageUrl = () => {
    navigator.clipboard.writeText(pageUrl);
    toast.info("URL copied to clipboard");
  };

  return (
    <div className="flex gap-4 items-center justify-between container mx-auto px-2 py-4">
      {authUser && authUser?.uid === user?.uid && (
        <Link href="/editor">
          <Button variant="outline">Back to Editor</Button>
        </Link>
      )}
      <Button onClick={copyPageUrl} className="ms-auto">
        Share Link
      </Button>
    </div>
  );
};

export default PreviewHeader;
