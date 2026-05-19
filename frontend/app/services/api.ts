import { Stock } from "../types/portfolio";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPortfolio(): Promise<Stock[]> {
  const res = await fetch(`${API_URL}/portfolio`, { cache: "no-store" });

  if (!res.ok) {
    throw new Error("Failed to fetch portfolio");
  }

  return res.json();
}