"use client";

import { useState, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import { createTransaction } from "@/features/transaction/api/transactionApi";
import axios from "axios";

export default function TransactionPage() {
  const { id: eventId } = useParams();
  const router = useRouter();

  const [event, setEvent] = useState<any>(null);
  const [ticketTypeId, setTicketTypeId] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [usePoints, setUsePoints] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch event details
  const fetchEvent = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `http://localhost:8080/api/events/${eventId}`
      );
      setEvent(data);
    } catch (err) {
      console.error("Failed to load event:", err);
      alert("Failed to load event details. Please try again.");
    }
  }, [eventId]);

  useEffect(() => {
    if (eventId) fetchEvent();
  }, [eventId, fetchEvent]);

  // Handle transaction submit
  const handlePurchase = async () => {
    if (!ticketTypeId || quantity < 1) {
      return alert("Please select ticket type and quantity");
    }

    const token = localStorage.getItem("token");
    if (!token) {
      return alert("You must be logged in to purchase tickets.");
    }

    setLoading(true);
    try {
      await createTransaction(token, {
        eventId: String(eventId),
        ticketTypeId,
        quantity,
        usePoints,
      });

      alert("Transaction successful!");
      router.push("/profile");
    } catch (err: any) {
      console.error("Purchase error:", err);
      alert(err?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  if (!event) return <p className="p-6">Loading event details...</p>;

  // Hitung harga termurah
  const minPrice =
    event.tickets?.length > 0
      ? Math.min(...event.tickets.map((t: any) => t.price))
      : null;

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Purchase Tickets</h1>

      <h2 className="text-xl font-semibold">{event.title}</h2>
      <p className="text-gray-600 mb-2">{event.description}</p>

      {minPrice !== null && (
        <p className="text-lg font-medium text-green-600 mb-4">
          From Rp {minPrice.toLocaleString()}
        </p>
      )}

      <div className="mb-4">
        <label className="block mb-2 font-medium">Ticket Type</label>
        <select
          className="border p-2 rounded w-full"
          value={ticketTypeId}
          onChange={(e) => setTicketTypeId(e.target.value)}
        >
          <option value="">Select ticket type</option>
          {event.tickets?.map((ticket: any) => (
            <option key={ticket.id} value={ticket.id}>
              {ticket.name} - Rp {ticket.price.toLocaleString()}
            </option>
          ))}
        </select>
      </div>

      <div className="mb-4">
        <label className="block mb-2 font-medium">Quantity</label>
        <input
          type="number"
          min="1"
          className="border p-2 rounded w-full"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <label className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={usePoints}
          onChange={(e) => setUsePoints(e.target.checked)}
        />
        Use points
      </label>

      <button
        onClick={handlePurchase}
        disabled={loading || !ticketTypeId}
        className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 rounded-lg shadow-md transition duration-200 disabled:opacity-50"
      >
        {loading ? "Processing..." : "Buy Now"}
      </button>
    </div>
  );
}
