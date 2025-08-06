"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function UpcomingEvents() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/events/upcoming?limit=3"
        );

        setEvents(response.data || []);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.slice(0, 3).map((event) => (
              <div
                key={event.id}
                onClick={() => router.push(`/eventdetails/${event.id}`)}
                className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition transform hover:-translate-y-1 bg-white"
              >
                <img
                  src={event.image ?? "/default.jpg"}
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
