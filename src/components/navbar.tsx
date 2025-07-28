"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Navbar() {
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#FFD522] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-col md:flex-row md:justify-between md:items-center gap-3">
        {/* Logo */}
        <div className="flex justify-between items-center w-full md:w-auto">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/Logo BikinAcara.png"
              alt="Logo"
              width={180}
              height={60}
              priority
            />
          </Link>
        </div>

        {/* Navigation Links */}
        <div className="space-x-6 hidden md:flex">
          <Link
            href="#"
            className="text-[#000000] font-semibold hover:text-[#FF471F]"
          >
            Contact Sales
          </Link>
          <Link
            href="#"
            className="text-[#000000] font-semibold hover:text-[#FF471F]"
          >
            Create Events
          </Link>
          <Link
            href="#"
            className="text-[#000000] font-semibold hover:text-[#FF471F]"
          >
            Help Center
          </Link>
        </div>
      </div>
    </nav>
  );
}
