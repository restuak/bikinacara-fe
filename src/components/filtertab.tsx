"use client"

export default function FilterTab() {
    return (
      <div className="max-w-7xl mx-auto px-4 mt-10">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="text-lg font-medium mb-4 md:mb-0">
            Browsing events in{" "}
            <select className="font-semibold text-black bg-transparent underline">
              <option value="tasikmalaya">Surabaya</option>
              <option value="bandung">Bandung</option>
              <option value="jakarta">Jakarta</option>
              {/* Add more locations */}
            </select>
          </div>

          <div className="flex flex-wrap gap-4 text-sm text-black">
            {[
              "All",
              "For you",
              "Online",
              "Today",
              "This weekend",
              "Free",
              "Music",
              "Food & Drink",
            ].map((tab) => (
              <button
                key={tab}
                className="px-3 py-1 rounded-md bg-[#FFD522] border-b-2 border-transparent hover:border-[#FF471F] transition"
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
}
