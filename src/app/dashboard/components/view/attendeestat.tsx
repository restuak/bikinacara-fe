
"use client";

import { useEffect, useState } from "react";
import { getAttendeeStats } from "@/services/statisticService";

type Stats = {
  totalEvents: number;
  totalTickets: number;
  totalSpent: number;
  transactionsCount: number;
};

export default function AttendeeStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getAttendeeStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <Card title="Total Events" value={stats.totalEvents} />
      <Card title="Total Tickets" value={stats.totalTickets} />
      <Card
        title="Total Spent (IDR)"
        value={stats.totalSpent.toLocaleString()}
      />
      <Card title="Transactions" value={stats.transactionsCount} />
    </div>
  );
}

const Card = ({ title, value }: { title: string; value: number | string }) => (
  <div className="bg-white rounded-2xl shadow p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2 font-bold text-indigo-600">{value}</p>
  </div>
);
