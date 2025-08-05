"use client";

import { useRouter } from "next/navigation";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User, Users } from "lucide-react";

export default function SelectRolePage() {
  const router = useRouter();

  const handleSelectRole = (role: "attendee" | "organizer") => {
    router.push(`/auth/login?role=${role}`);
  };

  return (
    <div className="min-h-screen bg-yellow-50 flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl bg-white shadow-lg rounded-xl p-8">
        <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
          Choose Your Intention
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-40 border-2 border-yellow-400 rounded-lg hover:bg-yellow-100"
            onClick={() => handleSelectRole("attendee")}
          >
            <User className="w-10 h-10 mb-2 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">
              Attendee/Guest
            </span>
          </Button>
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-40 border-2 border-yellow-400 rounded-lg hover:bg-yellow-100"
            onClick={() => handleSelectRole("organizer")}
          >
            <Users className="w-10 h-10 mb-2 text-yellow-500" />
            <span className="text-lg font-semibold text-gray-700">
              Event Organizer
            </span>
          </Button>
        </div>
      </Card>
    </div>
  );
}
