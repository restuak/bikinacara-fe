import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const backendRes = await fetch(
      `http://localhost:8080/api/events/upcoming?limit=3`
    );
    const data = await backendRes.json();
    res.status(backendRes.status).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch data" });
  }
}
