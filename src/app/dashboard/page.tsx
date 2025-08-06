import { IJwtPayload } from "@/lib/user";
import { jwtDecode } from "jwt-decode";
import OrganizerStats from "./organizerStat";

export default function Dashboard() {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const user = jwtDecode<IJwtPayload>(token);

  return (
    <div className="max-w-6xl mx-auto mt-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user.role === "ORGANIZER" && <OrganizerStats />}
    </div>
  );
}
