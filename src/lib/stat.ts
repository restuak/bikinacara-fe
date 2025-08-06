
import axios from "axios";

const API_URL = "http://localhost:8080/api"; 

export const getOrganizerStats = async () => {
  const res = await axios.get(`${API_URL}/statistics/organizer`);
  return res.data;
};

export const getAttendeeStats = async () => {
  const res = await axios.get(`${API_URL}/statistics/attendee`);
  return res.data;
};
