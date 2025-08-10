"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { UserCircle, Ticket, CalendarDays, DollarSign } from "lucide-react";

import { AttendeeStats } from "@/interface/attedee";
import { UserInfoAttendee } from "@/interface/attedee";

const API_URL = "http://localhost:8080/api";

export default function AttendeeProfilePage() {
  const [stats, setStats] = useState<AttendeeStats | null>(null);
  const [user, setUser] = useState<UserInfoAttendee | null>(null);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    fetchUser();
    fetchStats();
  }, [token]);

  const fetchStats = async () => {
    try {
      const res = await axios.get<AttendeeStats>(`${API_URL}/attendee`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setStats(res.data);
    } catch (error) {
      console.error("Failed to fetch stats", error);
    }
  };

  const fetchUser = async () => {
    try {
      const res = await axios.get<UserInfoAttendee>(`${API_URL}/users/detail`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUser(res.data);
    } catch (error) {
      console.error("Failed to fetch user", error);
    }
  };

  const chartData = stats
    ? [
        { name: "Events", value: stats.totalEvents },
        { name: "Tickets", value: stats.totalTickets },
        { name: "Spent", value: stats.totalSpent },
      ]
    : [];

  const COLORS = ["#FF471F", "#FFD522", "#5AC8FA"];

  return (
    <div className="max-w-4xl mx-auto p-6 font-nunito">
      {/* PROFILE CARD */}
      {user && (
        <div className="mb-6 text-center">
          {user.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile"
              className="w-24 h-24 rounded-full mx-auto mb-2 object-cover"
            />
          )}
          <h1 className="text-3xl font-extrabold text-[#000000]">
            {user.name}
          </h1>
          <p className="text-[#545454] text-sm">{user.role}</p>
          <p className="text-[#a6a6a6] text-sm">{user.email}</p>
        </div>
      )}
      <div className="container mx-auto grid grid-cols-2 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <UserCircle className="w-8 h-8 text-purple-500" />
          <div>
            <p className="text-gray-500 text-sm">Referral Code</p>
            <p className="text-lg font-bold text-black">
              {user?.referralCode ?? "-"}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-yellow-500" />
          <div>
            <p className="text-gray-500 text-sm">Point Balance</p>
            <p className="text-lg font-bold text-black">
              {user?.pointsBalance?.toLocaleString() ?? "0"} pts
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <UserCircle className="w-8 h-8 text-[#FF471F]" />
          <div>
            <p className="text-gray-500 text-sm">Transactions</p>
            <p className="text-lg font-bold text-black">
              {stats?.transactionsCount ?? "-"}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <CalendarDays className="w-8 h-8 text-[#FFD522]" />
          <div>
            <p className="text-gray-500 text-sm">Total Events</p>
            <p className="text-lg font-bold text-black">
              {stats?.totalEvents ?? "-"}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <Ticket className="w-8 h-8 text-[#5AC8FA]" />
          <div>
            <p className="text-gray-500 text-sm">Total Tickets</p>
            <p className="text-lg font-bold text-black">
              {stats?.totalTickets ?? "-"}
            </p>
          </div>
        </div>
        <div className="bg-white p-4 rounded-xl shadow border border-gray-200 flex items-center gap-4">
          <DollarSign className="w-8 h-8 text-green-500" />
          <div>
            <p className="text-gray-500 text-sm">Total Spent</p>
            <p className="text-lg font-bold text-black">
              Rp {(stats?.totalSpent ?? 0).toLocaleString("id-ID")}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow border border-gray-200">
        <h2 className="text-xl font-semibold mb-4 text-[#000000]">
          Summary Chart
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {chartData.map((_, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
