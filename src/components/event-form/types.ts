export type PromotionType = "referral" | "date";
export type ValueType = "percent" | "amount";

export interface PromotionInput {
  type: PromotionType;
  value: number;
  valueType: ValueType;
  usageLimit?: number;
  startDate?: string;
  endDate?: string;
  voucherCode?: string;
}

export interface CreateEventFormData {
  eventName: string;
  eventDate: string;
  promotions: PromotionInput[];
}
