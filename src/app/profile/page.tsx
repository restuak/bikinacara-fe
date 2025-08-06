"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { UserDetail, AttendeeStats } from "@/interface/attedee";

const API_URL = "http://localhost:8080/api";
const COLORS = ["#FF471F", "#FF6D4D", "#FFD522", "#a6a6a6", "#545454"];

export default function AttendeeProfilePage() {
  const [user, setUser] = useState<UserDetail | null>(null);
  const [stats, setStats] = useState<AttendeeStats | null>(null);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get(`${API_URL}/users/detail`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const userData = res.data;
        if (userData.role !== "ATTENDEE") {
          router.push("/");
        } else {
          setUser(userData);
          setIsAuthorized(true);
        }
      } catch (err) {
        console.error("Fetch user error:", err);
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    if (token) fetchUser();
    else router.push("/");
  }, [token]);

  useEffect(() => {
    if (!isAuthorized) return;
    fetchStats();
  }, [isAuthorized]);

  const fetchStats = async () => {
    try {
      const res = await axios.get(`${API_URL}/statistics/attendee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch attendee stats:", error);
    }
  };

  if (loading) {
    return <p className="text-center text-gray-500">Loading...</p>;
  }

  if (!isAuthorized || !user || !stats) return null;

  const pieData = [
    { name: "Events", value: stats.totalEvents },
    { name: "Tickets", value: stats.totalTickets },
    { name: "Transactions", value: stats.transactionsCount },
    { name: "Spent", value: stats.totalSpent },
  ];

  return (
    <div className="p-4 max-w-4xl mx-auto font-nunito">
      <div className="mb-6 text-center">
        {user.profilePic && (
          <img
            src={user.profilePic}
            alt="Profile"
            className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
          />
        )}
        <h1 className="text-3xl font-extrabold text-[#000000]">{user.name}</h1>
        <p className="text-[#545454] text-sm">Role: {user.role}</p>
        <p className="text-[#a6a6a6] text-sm">{user.email}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center mb-6">
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-xl font-bold text-[#FF471F]">
            {stats.totalEvents}
          </h3>
          <p className="text-sm text-[#545454]">Total Events</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-xl font-bold text-[#FF6D4D]">
            {stats.totalTickets}
          </h3>
          <p className="text-sm text-[#545454]">Tickets Bought</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-xl font-bold text-[#FFD522]">
            {stats.transactionsCount}
          </h3>
          <p className="text-sm text-[#545454]">Transactions</p>
        </div>
        <div className="bg-white shadow rounded-xl p-4">
          <h3 className="text-xl font-bold text-[#545454]">
            Rp{stats.totalSpent.toLocaleString()}
          </h3>
          <p className="text-sm text-[#545454]">Total Spent</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl shadow">
        <h2 className="text-lg font-bold text-[#000000] mb-4">Overview</h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
