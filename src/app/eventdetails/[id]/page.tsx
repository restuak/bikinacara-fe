"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

type Event = {
  id: string;
  title: string;
  description: string;
  location: string;
  date: string;
  image_url?: string;
};

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/events/${id}`);
        if (!res.ok) throw new Error("Event not found");
        const data: Event = await res.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="p-6 max-w-xl mx-auto animate-pulse space-y-4">
        <div className="h-6 bg-gray-300 rounded w-1/2" />
        <div className="h-4 bg-gray-200 rounded w-full" />
        <div className="h-4 bg-gray-200 rounded w-3/4" />
        <div className="h-64 bg-gray-100 rounded-lg" />
      </div>
    );
  }

  if (error)
    return <p className="text-red-500 text-center mt-8">Error: {error}</p>;
  if (!event) return <p className="text-center mt-8">Event not found.</p>;

  return (
    <div className="p-6 max-w-xl mx-auto">
      <h1 className="text-3xl font-bold mb-2 text-gray-800">{event.title}</h1>

      <p className="text-gray-700 mb-2">{event.description}</p>
      <p className="text-gray-600 mb-1">{event.location}</p>

      <p className="text-sm text-gray-500 mb-4">
        {new Date(event.date).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      <div className="relative w-full h-64 rounded-lg overflow-hidden shadow-lg mb-6">
        <Image
          src={event.image_url || "/default.jpg"}
          alt={event.title}
          layout="fill"
          className="object-cover"
          priority
        />
      </div>

      <button
        onClick={() => alert("Redirect to ticket page or open modal")}
        className="w-full bg-[#FFD522] hover:bg-black text-black hover:text-white font-semibold py-3 rounded-lg shadow-md transition duration-200"
      >
        Buy Tickets
      </button>
    </div>
  );
};

export default EventDetailPage;
