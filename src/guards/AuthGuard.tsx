"use client";
import Loader from "@/components/Loader";
import { useAuthStore } from "@/stores/auth.store";
import React, { useEffect } from "react";

const AuthGuard = ({ children }: { children: React.ReactNode }) => {
  const { loadingUser, initializeAuth, user } = useAuthStore();

  useEffect(() => {
    initializeAuth();
  }, [initializeAuth]);

  if (loadingUser && !user) {
    return <Loader />;
  }

  return <>{children}</>;
};

export default AuthGuard;
