import axios from "axios";

export const getAttendeeStats = async () => {
  const res = await axios.get("http://localhost:8080/api/statistics/attendee");
  if (res.status !== 200) {
    throw new Error("Failed to fetch Customer statistics");
  }
  return res.data;
};

export const getOrganizerStats = async () => {
  const res = await axios.get("http://localhost:8080/api/statistics/dashboard");
  if (res.status !== 200) {
    throw new Error("Failed to fetch Organizer statistics");
  }
  return res.data;
};

