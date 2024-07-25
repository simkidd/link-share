import React from "react";
import LoginForm from "../components/LoginForm";

const LoginPage = () => {
  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Login</h1>
        <p className="text-gray-500">
          App your details below to get back into the app
        </p>
      </div>
      <LoginForm />
      <p className="mt-4 text-center text-gray-500">
        Don't have an account?{" "}
        <a href="/sign-up" className="text-indigo-600 hover:underline">
          Create account
        </a>
      </p>
    </div>
  );
};

export default LoginPage;
