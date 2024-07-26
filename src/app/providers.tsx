"use client";
import AuthGuard from "@/guards/AuthGuard";

export function Providers({ children }: { children: React.ReactNode }) {
  return <AuthGuard>{children}</AuthGuard>;
}
