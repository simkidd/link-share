/* eslint-disable react/no-unescaped-entities */
import React from "react";
import SignUpForm from "../components/SignUpForm";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";

const SignUpPage = () => {
  return (
    <div className="w-full">
      <PageHeader
        title="Create account"
        desc="Let’s get you started sharing your links!"
      />
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
