"use client";

import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      const { data, error } = await supabase.from("events").select("*");

      if (error) {
        console.error("Error fetching events:", error);
      } else {
        setEvents(data || []);
      }

      setLoading(false);
    };

    fetchEvents();
  }, []);

  return (
    <section className="bg-white py-10 px-6 mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          Upcoming Events
        </h2>

        {loading ? (
          <p className="text-gray-500">Loading events...</p>
        ) : (
          <div className="grid md:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
              >
                <Image
                  src={event.imageUrl || "/default.jpg"}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="object-cover w-full h-56"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg text-gray-800">
                    {event.title}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {event.location} •{" "}
                    {new Date(event.date).toLocaleDateString("id-ID", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
