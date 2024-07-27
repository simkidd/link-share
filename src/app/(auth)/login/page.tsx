/* eslint-disable react/no-unescaped-entities */
import React from "react";
import LoginForm from "../components/LoginForm";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const LoginPage = () => {
  return (
    <div className="w-full">
      <PageHeader
        title="Login"
        desc="App your details below to get back into the app"
      />
      <LoginForm />
      <p className="mt-6 text-center text-gray-500">
        Don't have an account?{" "}
        <Link href="/sign-up" className="text-primary hover:underline">
          Create account
        </Link>
      </p>
    </div>
  );
};

export default LoginPage;
