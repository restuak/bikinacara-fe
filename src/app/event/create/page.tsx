"use client";

import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import ForbiddenPage from "@/app/forbidden/page";
import PromoSection from "@/components/promotion/promosection";
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
  const { user } = useAuthStore();

  if (!user?.token) {
    return <ForbiddenPage />;
  }

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "concert",
    eventCategory: "EDUCATION",
    ticketType: "free",
    ticketPrice: 0,
    totalSeats: 0,
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "ticketPrice" || name === "totalSeats" ? Number(value) : value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("date", new Date(form.date).toISOString());
    formData.append("time", new Date(`1970-01-01T${form.time}`).toISOString());
    formData.append("location", form.location);
    formData.append("eventCategory", form.eventCategory);
    formData.append("totalSeats", String(form.totalSeats));
    formData.append("eventType", form.ticketType.toUpperCase());
    formData.append("ticketPrice", String(form.ticketPrice));
    formData.append("organizerId", user.id);

    if (image) {
      formData.append("image", image);
    }

    const res = await fetch("http://localhost:8080/api/events", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${user.token}`, 
      },
      body: formData,
    });

    const data = await res.json();
    console.log(data);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Create Event</h1>

      <form className="space-y-6" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="block mb-1 font-medium">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
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
            name="description"
            value={form.description}
            onChange={handleChange}
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
                checked={form.ticketType === "free"}
                onChange={handleChange}
              />
              Free
            </label>
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="ticketType"
                value="paid"
                checked={form.ticketType === "paid"}
                onChange={handleChange}
              />
              Paid
            </label>
          </div>
        </div>

        {/* Ticket Price (only if paid) */}
        {form.ticketType === "paid" && (
          <div>
            <label className="block mb-1 font-medium flex items-center gap-2">
              <FaMoneyBillAlt /> Ticket Price (in IDR)
            </label>
            <input
              type="number"
              name="ticketPrice"
              value={form.ticketPrice}
              onChange={handleChange}
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
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaClock /> Time
          </label>
          <input
            type="time"
            name="time"
            value={form.time}
            onChange={handleChange}
            className="w-full border rounded p-2"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaMapMarkerAlt /> Location
          </label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="Venue or address"
          />
        </div>

        {/* Event Category */}
        <div>
          <label className="block mb-1 font-medium flex items-center gap-2">
            <FaTag /> Event Category
          </label>
          <select
            name="eventCategory"
            value={form.eventCategory}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="MUSIC">Music</option>
            <option value="NIGHTLIFE">Nightlife</option>
            <option value="ARTS">Arts</option>
            <option value="HOLIDAYS">Holidays</option>
            <option value="EDUCATION">Education</option>
            <option value="HOBBIES">Hobbies</option>
            <option value="BUSINESS">Business</option>
            <option value="FOOD_AND_DRINK">Food & Drink</option>
          </select>
        </div>

        {/* Total Seats */}
        <div>
          <label className="block mb-1 font-medium">Total Seats</label>
          <input
            type="number"
            name="totalSeats"
            value={form.totalSeats}
            onChange={handleChange}
            className="w-full border rounded p-2"
            placeholder="e.g., 100"
          />
        </div>

        {/* Promo Section (optional) */}
        <PromoSection />

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
