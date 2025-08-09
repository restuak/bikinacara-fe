"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import debounce from "lodash/debounce";

const LIMIT = 9;

export default function ExplorePage() {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");

  // Fetch events function
  const fetchEvents = useCallback(async () => {
    setLoading(true);
    try {
      const url = new URL("http://localhost:8080/api/events/filter");
      url.searchParams.append("page", page.toString());
      url.searchParams.append("limit", LIMIT.toString());
      if (title) url.searchParams.append("title", title);
      if (category) url.searchParams.append("category", category);
      if (location) url.searchParams.append("location", location);
      if (eventType) url.searchParams.append("eventType", eventType);

      const res = await fetch(url.toString());
      const data = await res.json();

      setEvents(data.events || []);
      setTotalPages(data.totalPages || 1);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  }, [title, page, category, location, eventType]);

  // Debounce function to update title and reset page
  const debouncedSetTitle = useMemo(
    () =>
      debounce((value: string) => {
        setTitle(value);
        setPage(1);
      }, 500),
    []
  );

  // Handle input change, call debounce
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetTitle(e.target.value);
  };

  // Whenever title (after debounce), page, or filters change, fetch events
  useEffect(() => {
    if (title.length === 0 || title.length >= 3) {
      fetchEvents();
    }
  }, [title, page, category, location, eventType, fetchEvents]);

  // Cancel debounce on unmount
  useEffect(() => {
    return () => {
      debouncedSetTitle.cancel();
    };
  }, [debouncedSetTitle]);

  // Handlers for other filters — reset page too
  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocation(e.target.value);
    setPage(1);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
    setPage(1);
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Explore Events</h1>
        <p className="text-gray-600 mt-2">
          Find the latest and trending events around you!
        </p>

        {/* Search & Filter */}
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <input
            type="text"
            placeholder="Search by title..."
            defaultValue={title}
            onChange={handleTitleChange}
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFD522]"
          />
          <select
            value={category}
            onChange={handleCategoryChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Categories</option>
            <option value="MUSIC">Music</option>
            <option value="NIGHTLIFE">Nightlife</option>
            <option value="ARTS">Arts</option>
            <option value="HOLIDAYS">Holiday</option>
            <option value="EDUCATION">Education</option>
            <option value="HOBBIES">Hobbies</option>
            <option value="BUSINESS">Business</option>
            <option value="FOOD_AND_DRINK">Food & Drink</option>
          </select>
          <input
            type="text"
            placeholder="Location..."
            value={location}
            onChange={handleLocationChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          />
          <select
            value={eventType}
            onChange={handleEventTypeChange}
            className="px-4 py-2 border border-gray-300 rounded-md"
          >
            <option value="">All Types</option>
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
          </select>
        </div>
      </div>

      {/* Event List */}
      {loading ? (
        <p className="text-center text-gray-500">Loading events...</p>
      ) : (
        <>
          <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.length > 0 ? (
              events.map((event) => (
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
              ))
            ) : (
              <p className="text-center col-span-full text-gray-500">
                No events found.
              </p>
            )}
          </section>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-8">
            <button
              onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
              disabled={page === 1}
              className="px-4 py-2 text-sm bg-[#FFD522] hover:bg-black rounded-md hover:text-white disabled:opacity-50"
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
              className="px-4 py-2 text-sm bg-[#FFD522] hover:bg-black rounded-md hover:text-white disabled:opacity-50"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
}
