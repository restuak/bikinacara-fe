"use client"

import { useState } from "react";

const ReferralPromoForm = () => {
  const [voucherCode, setVoucherCode] = useState("");
  const [discountPercent, setDiscountPercent] = useState("");
  const [maxUsers, setMaxUsers] = useState("");

  return (
    <div className="p-4 border rounded-lg bg-gray-50 space-y-3">
      <div>
        <label className="block text-sm font-medium">Kode Voucher</label>
        <input
          type="text"
          className="w-full border rounded p-2"
          value={voucherCode}
          onChange={(e) => setVoucherCode(e.target.value)}
          placeholder="Contoh: REF123"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Diskon (%)</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={discountPercent}
          onChange={(e) => setDiscountPercent(e.target.value)}
          placeholder="Contoh: 20"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Batas Pengguna</label>
        <input
          type="number"
          className="w-full border rounded p-2"
          value={maxUsers}
          onChange={(e) => setMaxUsers(e.target.value)}
          placeholder="Contoh: 100"
        />
      </div>
    </div>
  );
};

export default ReferralPromoForm;
