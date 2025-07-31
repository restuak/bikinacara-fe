"use client";

import Image from "next/image";

const events = [
  {
    id: 1,
    title: "Festival Musik Jakarta",
    location: "Jakarta",
    date: "20 Agustus 2025",
    image: "/konserJakarta.jpg",
  },
  {
    id: 2,
    title: "Startup Expo Surabaya",
    location: "Surabaya",
    date: "12 September 2025",
    image: "/startupEvent.jpg",
  },
  {
    id: 3,
    title: "Seminar Digital Marketing",
    location: "Bandung",
    date: "5 Oktober 2025",
    image: "/seminarDigital.jpg",
  },
];

export default function PopularEvents() {
  return (
    <section className="bg-white py-10 px-6 mt-24">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Event Populer</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="rounded-xl overflow-hidden shadow hover:shadow-lg transition"
            >
              <Image
                src={event.image}
                alt={event.title}
                width={400}
                height={250}
                className="object-cover w-full h-56"
              />
              <div className="p-4">
                <h3 className="font-semibold text-lg text-gray-800">
                  {event.title}
                </h3>
                <p className="text-sm text-gray-500">
                  {event.location} • {event.date}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}