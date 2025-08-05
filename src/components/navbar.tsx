"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiLogIn, FiLogOut } from "react-icons/fi";
import { useEffect, useState } from "react";

interface UserData {
  name: string;
  role: string;
}

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser: UserData = JSON.parse(userData);
        setUser(parsedUser);
        setIsAuthenticated(true);
      } catch (err) {
        console.error("Failed to parse user data");
        localStorage.removeItem("user");
        setIsAuthenticated(false);
      }
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    router.push("/");
  };

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#FFD522] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo & Search */}
        <div className="flex items-center space-x-4 sm:space-x-10">
          <Link href="/" className="flex items-center space-x-2">
            <img src="/Logo BikinAcara.png" alt="Logo" className="h-8 w-auto" />
          </Link>

          {isHome && (
            <div className="relative hidden sm:block">
              <input
                type="text"
                placeholder="Cari acara..."
                className="pl-10 pr-20 py-2 rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-[#FF471F]"
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
          )}
        </div>

        {/* Kanan: Auth Buttons & User */}
        <div className="flex items-center space-x-4 text-sm">
          {!isAuthenticated ? (
            <Link
              href="/auth"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-[#e13f1a] hover:text-white transition"
            >
              <FiLogIn className="text-lg" /> 
            </Link>
          ) : (
            <>
              <span className="hidden sm:block font-semibold">
                Halo, {user?.name}
              </span>
              {user?.role === "organizer" && (
                <Link
                  href="/create-event"
                  className="bg-[#FF471F] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#e13f1a] transition"
                >
                  Create Event
                </Link>
              )}
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-red-600 hover:text-white transition"
              >
                <FiLogOut className="text-lg" /> Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
