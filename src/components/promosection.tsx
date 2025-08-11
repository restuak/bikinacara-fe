"use client";

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

export default function PromoSection({
  onPromotionsChange,
}: PromoSectionProps) {
  const handleAddPromo = () => {
    onPromotionsChange((prev) => [
      ...prev,
      {
        type: "DISCOUNT",
        value: 10,
        valueType: "PERCENT",
        usageLimit: 100,
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString(),
      },
    ]);
  };

  return (
    <div>
      <h3>Promo Section</h3>
      <button onClick={handleAddPromo}>Add Sample Promo</button>
    </div>
  );
}
