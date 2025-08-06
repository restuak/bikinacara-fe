"use client"

import { useState } from "react";
import ReferralPromoForm from "@/components/promotion/referralpromo";
import DatePromoForm from "@/components/promotion/datepromoform";

const PromoSection = () => {
  const [isReferralEnabled, setIsReferralEnabled] = useState(false);
  const [isDateDiscountEnabled, setIsDateDiscountEnabled] = useState(false);

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Apply Promotion</h2>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isReferralEnabled}
            onChange={() => setIsReferralEnabled(!isReferralEnabled)}
          />
          Gunakan promo referral
        </label>
        {isReferralEnabled && <ReferralPromoForm />}
      </div>

      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDateDiscountEnabled}
            onChange={() => setIsDateDiscountEnabled(!isDateDiscountEnabled)}
          />
          Gunakan promo berdasarkan tanggal
        </label>
        {isDateDiscountEnabled && <DatePromoForm />}
      </div>
    </div>
  );
};

export default PromoSection;