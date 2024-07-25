/* eslint-disable react/no-unescaped-entities */
import React from "react";
import SignUpForm from "../components/SignUpForm";
import Link from "next/link";

const SignUpPage = () => {
  return (
    <div className="w-full">
      <div className="mb-10">
        <h1 className="text-3xl font-semibold mb-2">Create account</h1>
        <p className="text-gray-500 text-base">
          Let’s get you started sharing your links!
        </p>
      </div>
      <SignUpForm />
      <p className="mt-6 text-center text-gray-500">
        Already have an account?{" "}
        <Link href="/login" className="text-primary hover:underline">
          Login
        </Link>
      </p>
    </div>
  );
};

export default SignUpPage;
