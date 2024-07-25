"use client";
import Button from "@/components/ui/Button";
import { LoginUserInput } from "@/interfaces/auth.interface";
import { useAuthStore } from "@/stores/auth.store";
import { useFormik } from "formik";
import { useState } from "react";
import { FaEnvelope, FaEye, FaEyeSlash, FaLock } from "react-icons/fa6";
import * as Yup from "yup";

const LoginForm = () => {
  const { login, loading } = useAuthStore();
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const formik = useFormik<LoginUserInput>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await login(values);
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
          Password
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
            className={`w-full pl-10 pr-10 py-2 border rounded-lg focus:outline-none focus:border-indigo-500 ${
              formik.touched.password &&
              formik.errors.password &&
              "border-red-500"
            }`}
          />
          <span
            className="absolute right-3 top-1/2 -translate-y-1/2  text-gray-400 cursor-pointer"
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

      <Button type="submit" disabled={formik.isSubmitting} className="w-full">
        {loading || formik.isSubmitting ? "Loading..." : "Login"}
      </Button>
    </form>
  );
};

export default LoginForm;
