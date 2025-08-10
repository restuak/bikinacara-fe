"use client";
import { useState, useEffect } from "react";
import { getReviews, createReview } from "@/features/reviews/api";

type Review = {
  id: string;
  rating: number;
  comment: string;
  user: { name: string };
  createdAt: string;
};

export default function EventReviews({ eventId }: { eventId: string }) {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  async function loadReviews() {
    const data = await getReviews(eventId);
    setReviews(data);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await createReview(eventId, rating, comment);
    setComment("");
    setRating(5);
    loadReviews();
  }

  useEffect(() => {
    loadReviews();
  }, [eventId]);

  return (
    <div className="mt-8 border-t pt-4">
      <h2 className="text-xl font-bold mb-3">Review</h2>

      {/* Form tambah review */}
      <form onSubmit={handleSubmit} className="mb-4">
        <div>
          <label>Rating:</label>
          <select
            value={rating}
            onChange={(e) => setRating(Number(e.target.value))}
            className="border p-1 ml-2"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
        <textarea
          placeholder="Tulis review..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border w-full p-2 mt-2"
          required
        />
        <button className="bg-blue-500 text-white px-3 py-1 mt-2 rounded">
          Kirim
        </button>
      </form>

      {/* List review */}
      <div className="space-y-3">
        {reviews.length === 0 && <p>Belum ada review</p>}
        {reviews.map((r) => (
          <div key={r.id} className="border p-2 rounded">
            <p className="font-semibold">{r.user?.name ?? "Anonim"}</p>
            <p>⭐ {r.rating}</p>
            <p>{r.comment}</p>
            <small className="text-gray-500">
              {new Date(r.createdAt).toLocaleString()}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}
