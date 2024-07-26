"use client";
import { useAuthStore } from "@/stores/auth.store";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { initializeAuth } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, []);

  return <div>{children}</div>;
};

export default AuthGuard;
