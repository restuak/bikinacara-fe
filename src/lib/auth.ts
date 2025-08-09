"use client";

import axios from "axios";

const API = "http://localhost:8080/api/auth";

export async function loginUser(data: {
  email: string;
  password: string;
  role: string;
}) {
  try {
    const response = await axios.post(`${API}/login`, data);
    const { token, user } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    return { token, user };
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Login failed, please try again"
    );
  }
}

export async function registerUser(data: {
  name: string;
  email: string;
  password: string;
  role: string;
  referralCode: string | null;
}) {
  try {
    const response = await axios.post(`${API}/register`, data);
    return response.data;
  } catch (error: any) {
    throw new Error(
      error.response?.data?.message || "Register failed, please try again"
    );
  }
}

export function logoutUser() {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}
