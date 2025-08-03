"use client";

import {
  FaMicrophone,
  FaCocktail,
  FaGamepad,
  FaSuitcase,
} from "react-icons/fa";
import { GiTheater, GiHotMeal } from "react-icons/gi";
import { MdHolidayVillage } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";

const categories = [
  { name: "Music", icon: <FaMicrophone size={30} /> },
  { name: "Nightlife", icon: <FaCocktail size={30} /> },
  { name: "Performing & Visual Arts", icon: <GiTheater size={30} /> },
  { name: "Holidays", icon: <MdHolidayVillage size={30} /> },
  { name: "Education", icon: <IoBookSharp size={30} /> },
  { name: "Hobbies", icon: <FaGamepad size={30} /> },
  { name: "Business", icon: <FaSuitcase size={30} /> },
  { name: "Food & Drink", icon: <GiHotMeal size={30} /> },
];

export default function BrowseCategories() {
  return (
    <section className="py-12 px-6 bg-white">
      <div className="max-w-7xl mx-auto text-left">
        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Browse by Category
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-8 gap-6">
          {categories.map((cat, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="w-20 h-20 flex items-center justify-center rounded-full border bg-[#FFD522] hover:border-3 hover:border-[#FF471F] transition">
                <div className="text-black">{cat.icon}</div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700">
                {cat.name}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
