"use client";

import { useState } from "react";
import ReferralPromoForm from "@/components/promotion/referralpromo";
import DatePromoForm from "@/components/promotion/datepromoform";

type Promotion = {
  type: string;
  value: number;
  valueType: string;
  usageLimit: number;
  startDate: string;
  endDate: string;
  voucherCode?: string;
};

interface PromoSectionProps {
  onPromotionsChange: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

const PromoSection: React.FC<PromoSectionProps> = ({ onPromotionsChange }) => {
  const [isReferralEnabled, setIsReferralEnabled] = useState(false);
  const [isDateDiscountEnabled, setIsDateDiscountEnabled] = useState(false);

  return (
    <div className="space-y-4 mt-8">
      <h2 className="text-xl font-semibold">Apply Promotion</h2>

      {/* Referral promo */}
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isReferralEnabled}
            onChange={() => setIsReferralEnabled(!isReferralEnabled)}
          />
          Gunakan promo referral
        </label>
        {isReferralEnabled && (
          <ReferralPromoForm onChange={onPromotionsChange} />
        )}
      </div>

      {/* Date-based promo */}
      <div className="space-y-2">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isDateDiscountEnabled}
            onChange={() => setIsDateDiscountEnabled(!isDateDiscountEnabled)}
          />
          Gunakan promo berdasarkan tanggal
        </label>
        {isDateDiscountEnabled && (
          <DatePromoForm onChange={onPromotionsChange} />
        )}
      </div>
    </div>
  );
};

export default PromoSection;
