"use client";

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState("attendee");
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const roleParam = searchParams.get("role");
    if (roleParam === "organizer" || roleParam === "attendee") {
      setRole(roleParam);
    } else {
      router.replace("/auth/select-role");
    }
  }, [searchParams]);

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-md p-6 bg-white shadow-xl rounded-xl">
        <h2 className="text-center text-2xl font-bold mb-6 text-gray-800">
          Login ({role})
        </h2>
        <form className="flex flex-col gap-4">
          <Input placeholder="Email" type="email" required />
          <div className="relative">
            <Input
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              required
            />
            <div
              className="absolute right-3 top-2.5 cursor-pointer text-gray-500"
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </div>
          </div>
          <Button className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold">
            Login
          </Button>
          <p className="text-sm text-center text-gray-600">
            No Account?{" "}
            <Link
              href={`/auth/register?role=${role}`}
              className="text-yellow-600 hover:underline"
            >
              Sign Up
            </Link>
          </p>
          <Link
            href="/"
            className="text-center text-sm text-gray-600 hover:underline block"
          >
            ← Back to Home
          </Link>
        </form>
      </Card>
    </div>
  );
}
