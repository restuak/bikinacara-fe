"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { FiSearch, FiLogIn, FiLogOut, FiUser } from "react-icons/fi";
import { useEffect, useRef, useState } from "react";
import { UserData } from "@/lib/user";


export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

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


  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="w-full fixed top-0 left-0 bg-[#FFD522] shadow z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
       
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

      
        <div
          className="flex items-center space-x-4 text-sm relative"
          ref={dropdownRef}
        >
          {!isAuthenticated ? (
            <Link
              href="/auth"
              className="flex items-center gap-2 bg-white text-black px-4 py-2 rounded-full font-semibold hover:bg-[#e13f1a] hover:text-white transition"
            >
              <FiLogIn className="text-lg" /> Login
            </Link>
          ) : (
            <>
              {user?.role === "ORGANIZER" && (
                <Link
                  href="/create-event"
                  className="bg-[#FF471F] text-white px-4 py-2 rounded-full font-semibold hover:bg-[#e13f1a] transition"
                >
                  Create Event
                </Link>
              )}

              <div className="relative">
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-white text-black hover:bg-gray-200 transition"
                >
                  <FiUser className="text-xl" />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
                    {user?.role === "ATTENDEE" && (
                      <Link
                        href="/profile"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    )}
                    {user?.role === "ORGANIZER" && (
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm hover:bg-gray-100"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      <FiLogOut className="inline mr-2" /> Logout
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
