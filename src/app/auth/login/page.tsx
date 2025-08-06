"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { loginUser } from "@/lib/auth";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "ATTENDEE";  

  const handleSubmit = async (log: any) => {
    log.preventDefault();
    try {
      await loginUser({ email, password, role });
      router.push("/");
    } catch (err) {
      setError("Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">LOGIN</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="role"
            placeholder="role"
            value={role}
            required
            hidden
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
          <button
            type="submit"
            className="cursor-pointer w-full bg-yellow-500 text-white py-2 rounded-md hover:bg-yellow-600"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          No Account?{" "}
          <Link
            href={`/auth/register?role=${role}`}
            className="cursor-pointer text-red-700 underline"
          >
            Register
          </Link>
        </p>
        <Link href="/" className="block text-center text-sm text-gray-600 mt-2">
          Back to Home
        </Link>
      </div>
    </div>
  );
}
