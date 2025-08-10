import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";

export async function getReviews(eventId: string) {
  const res = await fetch(`${API_BASE}/api/events/${eventId}/reviews`);
  const data = await res.json();
  return data || [];
}

export async function createReview(
  eventId: string,
  rating: number,
  comment: string
) {
  const { user } = useAuthStore.getState();
  if (!user?.token) throw new Error("Not authenticated");

  const res = await axios.post(
    `${API_BASE}/api/reviews/${eventId}`,
    { rating, comment },
    { headers: { Authorization: `Bearer ${user.token}` } }
  );
  return res.data.data;
}
