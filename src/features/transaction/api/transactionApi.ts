import axios from "axios";

export const createTransaction = async (
  token: string,
  payload: {
    eventId: string;
    ticketTypeId: string;
    quantity: number;
    usePoints?: boolean;
  }
) => {
  const res = await axios.post(
    "http://localhost:8080/api/transactions",
    payload,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return res.data;
};
