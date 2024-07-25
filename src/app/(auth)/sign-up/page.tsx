import SignUpForm from "@/app/(auth)/components/SignUpForm";
import React from "react";

const SignUpPage = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Create account</h1>
        <p className="text-gray-500">
          Let’s get you started sharing your links!
        </p>
      </div>
      <SignUpForm />
      <p className="mt-4 text-center text-gray-500">
        Already have an account?{" "}
        <a href="/login" className="text-indigo-600 hover:underline">
          Login
        </a>
      </p>
    </div>
  );
};

export default SignUpPage;
