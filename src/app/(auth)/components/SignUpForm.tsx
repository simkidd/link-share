"use client";
import Button from "@/components/ui/Button";
import { CreateUserInput } from "@/interfaces/auth.interface";
import { useAuthStore } from "@/stores/auth.store";
import { useFormik } from "formik";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import * as Yup from "yup";

const SignUpForm = () => {
  const { createUser, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);
  const [showCPassword, setShowCPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const toggleCPasswordVisibility = () => {
    setShowCPassword(!showCPassword);
  };

  const formik = useFormik<CreateUserInput>({
    initialValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), undefined], "Passwords must match")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { confirmPassword, ...rest } = values;
        await createUser(rest);
      } catch (err) {
        console.log(err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="mb-6">
        <label
          htmlFor="email"
          className="block mb-1 text-[12px] font-medium text-gray-700"
        >
          Email address
        </label>
        <div className="relative">
          <FaEnvelope className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="email"
            name="email"
            type="email"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.email}
            placeholder="alex@email.com"
            className={`w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 ${
              formik.touched.email && formik.errors.email && "border-red-500"
            }`}
          />
        </div>
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-6">
        <label
          htmlFor="password"
          className="block mb-1 text-[12px] font-medium text-gray-700"
        >
          Create Password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.password}
            placeholder="Enter your password"
            className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${
              formik.touched.password &&
              formik.errors.password &&
              "border-red-500"
            }`}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-400 cursor-pointer size-8 flex items-center justify-center"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="mb-6">
        <label
          htmlFor="confirmPassword"
          className="block mb-1 text-[12px] font-medium text-gray-700"
        >
          Confirm password
        </label>
        <div className="relative">
          <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showCPassword ? "text" : "password"}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={formik.values.confirmPassword}
            placeholder="Confirm your password"
            className={`w-full pl-10 pr-12 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${
              formik.touched.confirmPassword &&
              formik.errors.confirmPassword &&
              "border-red-500"
            }`}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-400 cursor-pointer size-8 flex items-center justify-center"
            onClick={toggleCPasswordVisibility}
          >
            {showCPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <Button type="submit" disabled={formik.isSubmitting} className="w-full">
        {loading || formik.isSubmitting
          ? "Creating account..."
          : "Create new account"}
      </Button>
    </form>
  );
};

export default SignUpForm;
