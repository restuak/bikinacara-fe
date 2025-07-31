"use client"

import { useState } from "react"

export default function SearchBar() {
    const [searchTerm, setSearchTerm] = useState("")

    return (
      <div className="w-full md:max-w-md">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search events..."
          className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#FF471F] transition"
        />
      </div>
    );
}