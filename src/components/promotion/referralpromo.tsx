import React, { useState } from "react";

type Promotion = {
  type: string;
  value: number;
  valueType: string;
  usageLimit: number;
  startDate: string;
  endDate: string;
  voucherCode?: string;
};

interface ReferralPromoFormProps {
  onChange: React.Dispatch<React.SetStateAction<Promotion[]>>;
}

const ReferralPromoForm: React.FC<ReferralPromoFormProps> = ({ onChange }) => {
  const [promo, setPromo] = useState<Promotion>({
    type: "referral",
    value: 0,
    valueType: "percent",
    usageLimit: 0,
    startDate: "",
    endDate: "",
    voucherCode: "",
  });

  const handleSave = () => {
    onChange((prev) => [...prev, promo]);
  };

  return (
    <div>
      {/* form fields */}
      <button type="button" onClick={handleSave}>
        Simpan Promo Referral
      </button>
    </div>
  );
};

export default ReferralPromoForm;
