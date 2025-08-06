"use client";

import { useEffect, useState } from "react";
import { getOrganizerStats } from "@/services/statisticService";
type Stats = {
  totalEvents: number;
  totalRevenue: number;
  totalTicketsSold: number;
  transactionsCount: number;
};

export default function OrganizerStats() {
  const [stats, setStats] = useState<Stats | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getOrganizerStats();
        setStats(data);
      } catch (err) {
        console.error("Failed to load organizer stats:", err);
      }
    };
    fetchStats();
  }, []);

  if (!stats) return <div>Loading...</div>;

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
      <Card title="Events" value={stats.totalEvents} />
      <Card title="Revenue (IDR)" value={stats.totalRevenue.toLocaleString()} />
      <Card title="Tickets Sold" value={stats.totalTicketsSold} />
      <Card title="Transactions" value={stats.transactionsCount} />
    </div>
  );
}

const Card = ({ title, value }: { title: string; value: number | string }) => (
  <div className="bg-white rounded-2xl shadow p-4 text-center">
    <h3 className="text-lg font-semibold">{title}</h3>
    <p className="text-2xl mt-2 font-bold text-green-600">{value}</p>
  </div>
);
