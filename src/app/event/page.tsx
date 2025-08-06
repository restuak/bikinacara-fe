"use client";

import { useParams } from "next/navigation";
import EventList from "@/components/eventslist";
import { useEffect, useState } from "react";

const VALID_CATEGORIES = [
  "MUSIC",
  "NIGHTLIFE",
  "ARTS",
  "HOLIDAYS",
  "EDUCATION",
  "HOBBIES",
  "BUSINESS",
  "FOOD_AND_DRINK",
];

export default function BrowseCategoryPage() {
  const params = useParams();
  const category = params?.slug as string;
  const [isValid, setIsValid] = useState(true);

  useEffect(() => {
    if (!VALID_CATEGORIES.includes(category)) {
      setIsValid(false);
    }
  }, [category]);

  if (!isValid) {
    return <div>“{category}” Category not found.</div>;
  }

  return (
    <div className="container">
      <h1 className="text-2xl font-semibold mb-4 capitalize">{category}</h1>
      <EventList category={category} />
    </div>
  );
}
