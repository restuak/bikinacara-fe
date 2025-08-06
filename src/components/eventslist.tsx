"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Event {
  id: string;
  title: string;
  date: string;
  location: string;
  image?: string;
}

interface Props {
  category: string;
}

export default function EventList({ category }: Props) {
  const [events, setEvents] = useState<Event[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const res = await axios.get("http://localhost:8080/api/events/filter", {
        params: {
          category,
          page,
          limit: 6,
        },
      });

      setEvents(res.data.data);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error("Error fetching events:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [category, page]);

  return (
    <div>
      {loading ? (
        <p>Loading...</p>
      ) : events.length === 0 ? (
        <p>No events found in this category.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map((event) => (
              <div
                key={event.id}
                className="rounded-xl overflow-hidden shadow-md bg-white"
              >
                <img
                  src={event.image ?? "/default.jpg"}
                  alt={event.title}
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

          {/* Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Prev
            </button>
            <span className="px-4 py-1">
              {page} / {totalPages}
            </span>
            <button
              onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={page === totalPages}
              className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
