"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type Event = {
  id: string;
  title: string;
  date: string;
  location: string;
};

const TicketPurchasePage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchEvent = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/events/${id}`);
        const data: Event = await res.json();
        setEvent(data);
      } catch (err) {
        console.error("Failed to fetch event:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, [id]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (!event) return <p className="text-center mt-10">Event not found.</p>;

  return (
    <div className="max-w-lg mx-auto p-6">
      <h1 className="text-2xl font-bold mb-2">Buy Ticket for:</h1>
      <p className="text-lg text-gray-800 mb-1">{event.title}</p>
      <p className="text-sm text-gray-600">{event.location}</p>
      <p className="text-sm text-gray-500 mb-4">
        {new Date(event.date).toLocaleDateString("id-ID", {
          weekday: "long",
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </p>

      {submitted ? (
        <div className="bg-green-100 text-green-800 p-4 rounded-lg">
          <p className="font-semibold">Thank you, {name}!</p>
          <p>Your ticket has been booked. Confirmation sent to {email}.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-gray-300 rounded px-3 py-2"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#FFD522] hover:bg-black text-black hover:text-white py-2 rounded-md font-semibold"
          >
            Confirm Purchase
          </button>
        </form>
      )}
    </div>
  );
};

export default TicketPurchasePage;
