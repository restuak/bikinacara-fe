// import axios from "axios";
// import useAuthStore from "@/store/useAuthStore";

// const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080";
// export const updatePaymentStatus = async (
//   transactionId: string,
//   paymentStatus: "PENDING" | "PAID" | "FAILED"
// ) => {
//   const { user } = useAuthStore.getState();
//   if (!user?.token) throw new Error("No token found");

//   const res = await axios.patch(
//     `${API_BASE}/api/transactions/${transactionId}`,
//     { paymentStatus },
//     {
//       headers: {
//         Authorization: `Bearer ${user.token}`,
//       },
//     }
//   );

//   return res.data.data ?? res.data;
// };
