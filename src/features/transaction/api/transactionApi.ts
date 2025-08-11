import axios from "axios";
import useAuthStore from "@/store/useAuthStore";

export const createTransaction = async (payload: {
  eventId: string;
  ticketTypeId: string;
  quantity: number;
  usePoints?: boolean;
}) => {
  const { user } = useAuthStore.getState();
  if (!user?.token) throw new Error("No token found");

  const res = await axios.post(
    "http://localhost:8080/api/transactions",
    payload,
    { headers: { Authorization: `Bearer ${user.token}` } }
  );

  return res.data.data;
};
