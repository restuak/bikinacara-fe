"use client";

import { useState } from "react";
import useAuthStore from "@/store/useAuthStore";
import ForbiddenPage from "@/app/forbidden/page";
import {
  FaCalendarAlt,
  FaClock,
  FaMapMarkerAlt,
  FaTag,
  FaImage,
} from "react-icons/fa";

export default function CreateEventPage() {
  const { user } = useAuthStore();

  const [form, setForm] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    location: "",
    eventType: "FREE", // FREE / PAID
    eventCategory: "EDUCATION",
    totalSeats: 0,
  });

  const [ticketTypes, setTicketTypes] = useState([
    { name: "", price: 0, quota: 0 },
  ]);

  const [promotion, setPromotion] = useState({
    type: "VOUCHER",
    value: 0,
    valueType: "PERCENTAGE",
    usageLimit: 0,
    startDate: "",
    endDate: "",
    voucherCode: "",
  });

  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  if (!user?.token) {
    return <ForbiddenPage />;
  }

  // Handle perubahan input form event
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "totalSeats" ? Number(value) : value,
    }));
  };

  // Handle perubahan ticket types
  const handleTicketTypeChange = (
    index: number,
    field: string,
    value: string | number
  ) => {
    setTicketTypes((prev) =>
      prev.map((ticket, i) =>
        i === index ? { ...ticket, [field]: value } : ticket
      )
    );
  };

  const handleAddTicketType = () => {
    setTicketTypes((prev) => [...prev, { name: "", price: 0, quota: 0 }]);
  };

  // Upload gambar
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePromotionChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setPromotion((prev) => ({
      ...prev,
      [name]: name === "value" || name === "usageLimit" ? Number(value) : value,
    }));
  };

  // Submit form
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      formData.append("date", form.date);
      formData.append("time", form.time);
      formData.append("location", form.location);
      formData.append("eventCategory", form.eventCategory.toUpperCase());
      formData.append("eventType", form.eventType.toUpperCase());
      formData.append("totalSeats", String(form.totalSeats));
      formData.append("organizerId", user.id);

      if (image) {
        formData.append("image", image);
      }

      // 1️⃣ Create Event
      const res = await fetch("http://localhost:8080/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });

      const eventData = await res.json();
      if (!res.ok)
        throw new Error(eventData.message || "Failed to create event");

      // 2️⃣ If event is PAID → create ticket types
      if (form.eventType === "PAID") {
        const ticketRes = await fetch(
          `http://localhost:8080/api/events/${eventData.id}/tickets`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify({ tickets: ticketTypes }),
          }
        );

        if (!ticketRes.ok) {
          throw new Error("Failed to create ticket types");
        }
      }

      // 3️⃣ Create promotion (kalau value > 0 atau voucherCode ada)
      if (promotion.value > 0 || promotion.voucherCode.trim() !== "") {
        const promoRes = await fetch(
          `http://localhost:8080/api/events/${eventData.id}/promotions`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${user.token}`,
            },
            body: JSON.stringify(promotion),
          }
        );

        if (!promoRes.ok) {
          throw new Error("Failed to create promotion");
        }
      }

      alert("Event created successfully!");
    } catch (err: any) {
      console.error(err);
      alert(err.message || "Something went wrong");
    }
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

        {/* Upload Banner */}
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

        {/* Event Type */}
        <div>
          <label className="block mb-1 font-medium">Event Type</label>
          <select
            name="eventType"
            value={form.eventType}
            onChange={handleChange}
            className="w-full border rounded p-2"
          >
            <option value="FREE">Free</option>
            <option value="PAID">Paid</option>
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

        {/* Ticket Types - Only if Paid */}
        {form.eventType === "PAID" && (
          <div>
            <label className="block mb-1 font-medium">Ticket Types</label>
            {ticketTypes.map((t, index) => (
              <div key={index} className="flex gap-2 mb-2">
                <input
                  type="text"
                  placeholder="Name"
                  value={t.name}
                  onChange={(e) =>
                    handleTicketTypeChange(index, "name", e.target.value)
                  }
                  className="border rounded p-2 flex-1"
                />
                <input
                  type="number"
                  placeholder="Price"
                  value={t.price}
                  onChange={(e) =>
                    handleTicketTypeChange(
                      index,
                      "price",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded p-2 w-24"
                />
                <input
                  type="number"
                  placeholder="Quota"
                  value={t.quota}
                  onChange={(e) =>
                    handleTicketTypeChange(
                      index,
                      "quota",
                      Number(e.target.value)
                    )
                  }
                  className="border rounded p-2 w-24"
                />
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddTicketType}
              className="text-sm text-blue-500"
            >
              + Add Ticket Type
            </button>
          </div>
        )}

        {/* Promotion Section */}
        <div className="space-y-4">
          {/* Jenis Promo */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Jenis Promo
            </span>
            <select name="type" className="border p-2 w-full rounded">
              <option value="VOUCHER">Voucher</option>
              <option value="REFERRAL">Referral</option>
              <option value="POINTS_REDEMPTION">Points Redemption</option>
            </select>
          </div>

          {/* Tipe Nilai */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Tipe Nilai
            </span>
            <select name="valueType" className="border p-2 w-full rounded">
              <option value="PERCENTAGE">Percentage</option>
              <option value="FIXED">Fixed</option>
            </select>
          </div>

          {/* Nilai Promo */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Nilai Promo
            </span>
            <input
              type="number"
              name="value"
              placeholder="10"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Batas Penggunaan */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Batas Penggunaan
            </span>
            <input
              type="number"
              name="usageLimit"
              placeholder="100"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Tanggal Mulai */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Tanggal Mulai
            </span>
            <input
              type="date"
              name="startDate"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Tanggal Berakhir */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Tanggal Berakhir
            </span>
            <input
              type="date"
              name="endDate"
              className="border p-2 w-full rounded"
            />
          </div>

          {/* Kode Voucher */}
          <div className="relative">
            <span className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-500">
              Kode Voucher (Opsional)
            </span>
            <input
              type="text"
              name="voucherCode"
              placeholder="Masukkan kode voucher"
              className="border p-2 w-full rounded"
            />
          </div>
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
