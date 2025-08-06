// import axios from "axios";

// const API_BASE_URL = "https://localhost:8080/api/events";

// export type EventQuery = {
//   search?: string;
//   category?: string;
//   location?: string;
//   eventType?: string;
//   page?: number;
//   limit?: number;
// };

// export const fetchFilteredEvents = async ({
//   search,
//   category,
//   location,
//   eventType,
//   page = 1,
//   limit = 10,
// }: EventQuery) => {
//   try {
//     const response = await axios.get(`${API_BASE_URL}/filter`, {
//       params: {
//         search,
//         category,
//         location,
//         eventType,
//         page,
//         limit,
//       },
//     });

//     return response.data;
//   } catch (error) {
//     console.error("Error fetching filtered events:", error);
//     throw error;
//   }
// };

