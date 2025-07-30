"use client";

import { useState } from "react";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
  FaImage,
  FaTicketAlt,
  FaMoneyBillAlt,
} from "react-icons/fa";

export default function CreateEventPage() {
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [ticketType, setTicketType] = useState<"free" | "paid">("free");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>
      <form className="space-y-6">
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Enter event title"
          />
        </div>

        {/* Upload Picture */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaImage /> Upload Banner
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full border rounded p-2"
          />
          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="mt-2 rounded-md max-h-48 object-cover"
            />
          )}
        </div>

        {/* Description */}
        <div>
          <label className="block mb-1 font-medium">Description</label>
          <textarea
            className="w-full border rounded p-2"
            rows={4}
            placeholder="Event details..."
          />
        </div>

        {/* Ticket Type */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaTicketAlt /> Ticket Type
          </label>
          <div className="flex space-x-4">
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="ticketType"
                value="free"
                checked={ticketType === "free"}
                onChange={() => setTicketType("free")}
              />
              Free
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="ticketType"
                value="paid"
                checked={ticketType === "paid"}
                onChange={() => setTicketType("paid")}
              />
              Paid
            </label>
          </div>
        </div>

        {/* Ticket Price (only if paid) */}
        {ticketType === "paid" && (
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaMoneyBillAlt /> Ticket Price (in IDR)
            </label>
            <input
              type="number"
              className="w-full border rounded p-2"
              placeholder="e.g., 50000"
            />
          </div>
        )}

        {/* Date */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaCalendarAlt /> Date
          </label>
          <input type="date" className="w-full border rounded p-2" />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaClock /> Time
          </label>
          <input type="time" className="w-full border rounded p-2" />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaMapMarkerAlt /> Location
          </label>
          <input
            type="text"
            className="w-full border rounded p-2"
            placeholder="Venue or address"
          />
        </div>

        {/* Event Type */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaTag /> Event Type
          </label>
          <select className="w-full border rounded p-2">
            <option value="concert">Concert</option>
            <option value="seminar">Seminar</option>
            <option value="workshop">Workshop</option>
          </select>
        </div>

        {/* Total Seats */}
        <div>
          <label className="block mb-1 font-medium">Total Seats</label>
          <input
            type="number"
            className="w-full border rounded p-2"
            placeholder="e.g., 100"
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-[#FFD522] text-black px-6 py-2 rounded hover:bg-[#FF471F] hover:text-white transition"
          >
            Create Event
          </button>
        </div>
      </form>
    </div>
  );
}
