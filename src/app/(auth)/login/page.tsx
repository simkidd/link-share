/* eslint-disable react/no-unescaped-entities */
import React from "react";
import LoginForm from "../components/LoginForm";
import Link from "next/link";

const LoginPage = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">Login</h1>
        <p className="text-gray-500 text-base">
          App your details below to get back into the app
        </p>
      </div>
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
