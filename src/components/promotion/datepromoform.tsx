"use client"

import { useState } from "react";

const DatePromoForm = () => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  return (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
      <div>
        <label className="block text-sm font-medium">Tanggal Mulai Promo</label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">
          Tanggal Selesai Promo
        </label>
        <input
          type="date"
          className="w-full border rounded p-2"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Diskon (%)</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Contoh: 15"
        />
      </div>
    </div>
  );
};

export default DatePromoForm;
