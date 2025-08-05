import axios from "axios";

export const getAttendeeStats = async () => {
  const res = await axios.get("http://localhost:8080/api/statistics/attendee");
  return res.data;
};
