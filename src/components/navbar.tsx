"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#FFD522] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Left: Logo and Search */}
        <div className="flex items-center space-x-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/Logo BikinAcara.png" alt="Logo" className="h-8 w-auto" />
          </Link>

          {isHome && (
            <div className="relative">
              <input
                type="text"
                placeholder="Cari acara..."
                className="pl-10 pr-20 py-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF471F]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}
        </div>

        {/* Right: Nav Links + Auth Buttons */}
        <div className="space-x-6 hidden md:flex items-center">
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

          {/* Auth Buttons */}
          <Link
            href="/login"
            className="bg-white text-black px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e13f1a] transition"
          >
            Login
          </Link>
          <Link
            href="/register"
            className="bg-[#FF471F] text-white px-4 py-2 rounded-full text-sm font-semibold hover:bg-[#e13f1a] transition"
          >
            Register
          </Link>
        </div>
      </div>
    </nav>
  );
}
