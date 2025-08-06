"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { registerUser } from "@/lib/auth";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();
  const role = searchParams.get("role") || "ATTENDEE";

  const handleSubmit = async (reg: any) => {
    reg.preventDefault();
    try {
      await registerUser({ name, email, password, role });
      setSuccess(true);
    } catch (err) {
      setError("Register failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-yellow-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">REGISTER</h1>
        {error && <p className="text-red-500 text-sm mb-4">{error}</p>}
        {success ? (
          <div className="text-center">
            <p className="text-green-600">Register success!</p>
            <Link
              href={`/auth/login?role=${role}`}
              className="text-red-700 underline mt-4 inline-block"
            >
              Back to Login
            </Link>
          </div>
        ) : (
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
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
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
