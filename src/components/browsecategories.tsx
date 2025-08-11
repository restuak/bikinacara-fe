"use client";

import Link from "next/link";
import { FaMicrophone, FaCocktail, FaGamepad, FaSuitcase } from "react-icons/fa";
import { GiTheater, GiHotMeal } from "react-icons/gi";
import { MdHolidayVillage } from "react-icons/md";
import { IoBookSharp } from "react-icons/io5";

const categories = [
  { name: "Music", value: "MUSIC", icon: <FaMicrophone size={30} /> },
  { name: "Nightlife", value: "NIGHTLIFE", icon: <FaCocktail size={30} /> },
  { name: "Performing & Visual Arts", value: "ARTS", icon: <GiTheater size={30} /> },
  { name: "Holidays", value: "HOLIDAYS", icon: <MdHolidayVillage size={30} /> },
  { name: "Education", value: "EDUCATION", icon: <IoBookSharp size={30} /> },
  { name: "Hobbies", value: "HOBBIES", icon: <FaGamepad size={30} /> },
  { name: "Business", value: "BUSINESS", icon: <FaSuitcase size={30} /> },
  { name: "Food & Drink", value: "FOOD_AND_DRINK", icon: <GiHotMeal size={30} /> },
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
            <Link
              key={index}
              href={`/explore?category=${cat.value}`}
              className="flex flex-col items-center text-center group"
            >
              <div className="w-20 h-20 flex items-center justify-center rounded-full border bg-[#FFD522] hover:border-3 hover:border-[#FF471F] transition">
                <div className="text-black">{cat.icon}</div>
              </div>
              <p className="mt-2 text-sm font-medium text-gray-700 group-hover:text-[#FF471F] transition">
                {cat.name}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
