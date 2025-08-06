"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  ResponsiveContainer,
} from "recharts";
import {
  DashboardEvent,
  StatisticData,
  UserInfo,
} from "@/interface/dashboard";
import {
  CalendarDaysIcon,
  BarChart3Icon,
  ListIcon,
  UsersRound,
  BadgeDollarSign,
  Star,
} from "lucide-react";

const API_URL = "http://localhost:8080/api";

export default function DashboardPage() {
  const [tab, setTab] = useState("events");
  const [events, setEvents] = useState<DashboardEvent[]>([]);
  const [yearlyStats, setYearlyStats] = useState<StatisticData[]>([]);
  const [monthlyStats, setMonthlyStats] = useState<StatisticData[]>([]);
  const [user, setUser] = useState<UserInfo | null>(null);
  const [year, setYear] = useState<number>(new Date().getFullYear());
  const [month, setMonth] = useState<number>(new Date().getMonth() + 1);

  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  useEffect(() => {
    if (!token) return;
    fetchUser();
    fetchEvents();
    fetchYearly();
    fetchMonthly();
  }, [token, year, month]);

  const fetchUser = async () => {
    const res = await axios.get(`${API_URL}/users/detail`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setUser(res.data);
  };

  const fetchEvents = async () => {
    const res = await axios.get(`${API_URL}/dashboard/organizer`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setEvents(res.data.data);
  };

  const fetchYearly = async () => {
    const res = await axios.get(`${API_URL}/statistics/yearly`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    setYearlyStats(res.data.data);
  };

  const fetchMonthly = async () => {
    const res = await axios.get(
      `${API_URL}/statistics/monthly?year=${year}&month=${month}`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    setMonthlyStats(res.data.data);
  };

  const tabs = [
    { key: "events", label: "Events", icon: <ListIcon className="w-4 h-4" /> },
    {
      key: "yearly",
      label: "Yearly Stats",
      icon: <BarChart3Icon className="w-4 h-4" />,
    },
    {
      key: "monthly",
      label: "Monthly Stats",
      icon: <CalendarDaysIcon className="w-4 h-4" />,
    },
  ];

  return (
    <div className="p-4 max-w-6xl mx-auto font-nunito">
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

      <div className="flex gap-4 mb-6 border-b overflow-x-auto">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`flex items-center gap-2 py-2 px-4 whitespace-nowrap border-b-2 transition-colors duration-200 ease-in-out
              ${
                tab === t.key
                  ? "border-[#FF471F] text-[#FF471F] font-bold"
                  : "border-transparent text-gray-500"
              }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      {tab === "events" && (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-white p-4 rounded-xl shadow border border-gray-200"
            >
              <h2 className="text-lg font-bold text-[#000000]">
                {event.title}
              </h2>
              <p className="text-sm text-[#a6a6a6] mb-2">
                {new Date(event.date).toLocaleDateString()} @ {event.location}
              </p>
              <p className="text-[#545454] flex items-center gap-1">
                <UsersRound className="w-4 h-4" />
                {event.totalParticipants} participants
              </p>
              <p className="text-[#FF471F] font-semibold flex items-center gap-1">
                <BadgeDollarSign className="w-4 h-4" />
                Rp {event.totalRevenue.toLocaleString()}
              </p>
              <p className="text-[#FF6D4D] flex items-center gap-1">
                <Star className="w-4 h-4" />
                {event.reviewCount} reviews
              </p>
            </div>
          ))}
        </div>
      )}

      {tab === "yearly" && (
        <div className="mt-4">
          <h2 className="text-lg font-bold text-[#000000] mb-2">
            Yearly Revenue ({year})
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={yearlyStats}>
              <CartesianGrid stroke="#eee" strokeDasharray="5 5" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#FF471F"
                strokeWidth={3}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}

      {tab === "monthly" && (
        <div className="mt-4">
          <div className="flex gap-4 mb-4 flex-wrap">
            <select
              value={year}
              onChange={(e) => setYear(parseInt(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              {[2023, 2024, 2025].map((y) => (
                <option key={y}>{y}</option>
              ))}
            </select>
            <select
              value={month}
              onChange={(e) => setMonth(parseInt(e.target.value))}
              className="border px-2 py-1 rounded"
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map((m) => (
                <option key={m} value={m}>
                  {new Date(0, m - 1).toLocaleString("default", {
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyStats}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Bar
                dataKey="totalRevenue"
                fill="#FFD522"
                radius={[4, 4, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
