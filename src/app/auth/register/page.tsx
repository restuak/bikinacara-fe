"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth";
import { useFormik } from "formik";
import { Eye, EyeOff } from "lucide-react";
import RegisterSchema from "./regisschema";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "ATTENDEE";

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [generatedCode, setGeneratedCode] = useState("");

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      referral: "",
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values) => {
      try {
        const response = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
          role,
          referralCode: values.referral || undefined,
        });

        const code = response.user?.referralCode || "";
        setGeneratedCode(code);
        setSuccess(true);
      } catch (err: any) {
        setError("Register failed");
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">REGISTER</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}

        {success ? (
          <div className="text-center space-y-3">
            <p className="text-green-600">Register success!</p>
            <p className="text-gray-700">
              <strong>Your Referral Code:</strong>
              <br />
              <span className="text-yellow-600 font-semibold text-lg border-2 px-2 py-1 inline-block rounded">
                {generatedCode}
              </span>
            </p>
            <p className="text-gray-600 text-sm">
              You can redeem this code to get a discount by inviting others to
              sign up.
            </p>
            <Link
              href={`/auth/login?role=${role}`}
              className="text-red-700 underline mt-4 inline-block"
            >
              Back to Login
            </Link>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <input type="hidden" value={role} name="role" />

            <input
              type="text"
              name="name"
              placeholder="Name"
              value={formik.values.name}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formik.values.email}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />
            {formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Password"
                value={formik.values.password}
                onChange={formik.handleChange}
                className="w-full px-4 py-2 border rounded-md pr-10"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute top-2 right-3 text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            <input
              type="text"
              name="referral"
              placeholder="Referral Code (Optional)"
              value={formik.values.referral}
              onChange={formik.handleChange}
              className="w-full px-4 py-2 border rounded-md"
            />

            <button
              type="submit"
              className="cursor-pointer w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
            >
              Register
            </button>
          </form>
        )}

        <Link href="/" className="block text-center text-sm text-gray-600 mt-4">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
