"use client";

export default function EventDetail() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Cover Image */}
      <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-md mb-8">
        <img
          src="/seminarDigital.jpg"
          alt="Event Cover"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Event Title & Location */}
      <div className="mb-6">
        <h1 className="text-4xl font-bold mb-2">Seminar Digital Marketing</h1>
        <p className="text-lg text-gray-600">
          Sat, 5 October • 10:00 PM WIB • Braga Art Hotel, Bandung
        </p>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Event Details */}
        <div className="lg:col-span-2 space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-2">About this event</h2>
            <p className="text-black leading-relaxed">
              Experience an intimate live performance by Ujang at the heart of
              Bandung. Join fellow Digital Marketing enthusiasts in a cozy
              venue, featuring a panel of professional Digital Marketers,
              curated snacks, and an exclusive merchandise booth.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
            <ul className="list-disc ml-5 text-black">
              <li>9:00 PM - Doors Open</li>
              <li>10:00 PM - Opening Act</li>
              <li>11:00 PM - Prof. Ujang Session</li>
              <li>12:00 PM - Meet & Greet</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-2">Location</h2>
            <p className="text-black">
              Braga Art Hotel, Jl. Braga No.10, Bandung, West Java, Indonesia
            </p>
          </section>
        </div>

        {/* Right: Ticket Info */}
        <div className="border border-gray-200 rounded-xl p-6 shadow-sm sticky top-8">
          <h3 className="text-xl font-semibold mb-4">Tickets</h3>
          <div className="mb-4">
            <p className="text-lg font-medium">General Admission</p>
            <p className="text-gray-500">Rp 150,000</p>
          </div>

          <button className="w-full bg-[#FFD522] text-black hover:bg-[#FF471F] hover:text-white py-3 rounded-md font-semibold transition">
            Get Tickets
          </button>
        </div>
      </div>
    </div>
  );
}
