// pages/category/[slug].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CategoryPage() {
  const router = useRouter();
  const { slug } = router.query;
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchEvents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/events/filter?category=${slug}`
        );
        setEvents(res.data);
      } catch (err) {
        console.error("Error fetching events:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [slug]);

  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <h1>Category: {slug}</h1>
      {events.length === 0 ? (
        <p>No events found.</p>
      ) : (
        <ul>
          {events.map((event: any) => (
            <li key={event.id}>{event.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
