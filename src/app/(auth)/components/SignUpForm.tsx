"use client";
import { CreateUserInput } from "@/interfaces/auth.interface";
import { useAuthStore } from "@/stores/auth.store";
import { useFormik } from "formik";
import * as Yup from "yup";

const SignUpForm = () => {
  const { createUser, loading } = useAuthStore();

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
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Email address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.email && formik.errors.email ? (
          <div className="text-red-600 text-sm mt-1">{formik.errors.email}</div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Create password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.password && formik.errors.password ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.password}
          </div>
        ) : null}
      </div>

      <div className="mb-4">
        <label
          htmlFor="confirmPassword"
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          Confirm password
        </label>
        <input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.confirmPassword}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
        />
        {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
          <div className="text-red-600 text-sm mt-1">
            {formik.errors.confirmPassword}
          </div>
        ) : null}
      </div>

      <button
        type="submit"
        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-lg hover:bg-indigo-700 focus:outline-none focus:bg-indigo-700"
        disabled={formik.isSubmitting}
      >
        {loading || formik.isSubmitting
          ? "Creating account..."
          : "Create new account"}
      </button>
    </form>
  );
};

export default SignUpForm;
