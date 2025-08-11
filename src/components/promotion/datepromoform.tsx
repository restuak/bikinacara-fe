"use client";

import { useState, useEffect } from "react";

type Promotion = {
  type: string;
  value: number;
  valueType: string;
  usageLimit: number;
  startDate: string;
  endDate: string;
  voucherCode?: string;
};

interface DatePromoFormProps {
  onChange: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

const DatePromoForm: React.FC<DatePromoFormProps> = ({ onChange }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");

  // setiap kali ada perubahan data, update parent
  useEffect(() => {
    if (startDate && endDate && discountPercent) {
      onChange((prev) => [
        ...prev.filter((p) => p.type !== "date"), // hapus promo lama tipe date
        {
          type: "date",
          value: Number(discountPercent),
          valueType: "percent",
          usageLimit: 999, // bisa disesuaikan
          startDate,
          endDate,
        },
      ]);
    }
  }, [startDate, endDate, discountPercent, onChange]);

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
