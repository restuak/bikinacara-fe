"use client";

import { useEffect, useState, useMemo, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import debounce from "lodash/debounce";

const LIMIT = 9;

export default function ExplorePage() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "";

  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [location, setLocation] = useState("");
  const [eventType, setEventType] = useState("");

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

  const debouncedSetFilter = useMemo(
    () =>
      debounce((key: "title" | "location", value: string) => {
        if (key === "title") setTitle(value);
        if (key === "location") setLocation(value);
        setPage(1);
      }, 500),
    []
  );

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilter("title", e.target.value);
  };

  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetFilter("location", e.target.value);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value);
    setPage(1);
  };

  const handleEventTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEventType(e.target.value);
    setPage(1);
  };

  useEffect(() => {
    if (
      (title.length === 0 || title.length >= 3) &&
      (location.length === 0 || location.length >= 3)
    ) {
      fetchEvents();
    }
  }, [title, page, category, location, eventType, fetchEvents]);

  useEffect(() => {
    return () => {
      debouncedSetFilter.cancel();
    };
  }, [debouncedSetFilter]);

  const getMinPrice = (event: any) => {
    if (typeof event.minPrice === "number") {
      return event.minPrice;
    }
    const tickets =
      event.tickets ?? event.ticketTypes ?? event.ticket_types ?? [];
    const prices = tickets
      .map((t: any) => Number(t.price))
      .filter((p: number) => !isNaN(p));
    return prices.length > 0 ? Math.min(...prices) : null;
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="mb-6 text-center">
        <h1 className="text-3xl font-semibold text-gray-800">Explore Events</h1>
        <p className="text-gray-600 mt-2">
          Find the latest and trending events around you!
        </p>

        {/* Filters */}
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
            defaultValue={location}
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
              events.map((event) => {
                const minPrice = getMinPrice(event);
                return (
                  <Link
                    key={event.id}
                    href={`/eventdetails/${event.id}`}
                    className="block rounded-2xl overflow-hidden border border-gray-200 shadow hover:shadow-md transition bg-white group cursor-pointer relative"
                  >
                    <div className="relative">
                      <Image
                        src={event.image_url || "/placeholder.jpg"}
                        alt={event.title}
                        width={400}
                        height={250}
                        className="w-full h-[250px] object-cover"
                      />
                      {minPrice !== null && (
                        <div className="absolute top-3 right-3 bg-black text-white px-3 py-1 rounded-full text-sm font-semibold shadow">
                          {minPrice === 0
                            ? "Free"
                            : `From Rp ${minPrice.toLocaleString("id-ID")}`}
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h2 className="font-bold text-lg text-gray-800">
                        {event.title}
                      </h2>
                      <p className="text-sm text-gray-500">{event.location}</p>
                      <p className="text-sm text-gray-600 mt-1">
                        {new Date(event.date).toLocaleDateString("id-ID")}
                      </p>
                    </div>
                  </Link>
                );
              })
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
