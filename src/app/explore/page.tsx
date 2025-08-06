"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LIMIT = 9;

export default function ExplorePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `http://localhost:8080/api/events?page=${page}&limit=${LIMIT}`
        );
        const data = await res.json();
        setEvents(data.events || []);
        setTotalPages(data.totalPages || 1);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page]);

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Explore Events</h1>
        <p className="text-gray-600 mt-2">
          Find the latest and trending events around you!
        </p>
      </div>

      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : (
        <>
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition bg-white"
              >
                <Image
                  src={event.image_url || "/placeholder.jpg"}
                  alt={event.title}
                  width={400}
                  height={250}
                  className="w-full h-[250px] object-cover"
                />
                <div className="p-4">
                  <h2 className="font-bold text-lg text-gray-800">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-500">{event.location}</p>
                  <p className="text-sm text-gray-600 mt-1">
                    {new Date(event.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ))}
          </section>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm bg-[#FFD522] hover:bg-black rounded-md hover:text-white"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i + 1)}
                className={`px-4 py-2 text-sm rounded-md ${
                  page === i + 1
                    ? "bg-black text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-4 py-2 text-sm bg-[#FFD522] hover:bg-black rounded-md hover:text-white"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
