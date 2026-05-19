"use client";

import { useEffect, useState } from "react";
import { fetchPortfolio } from "./services/api";
import { Stock } from "./types/portfolio";
import SectorGroup from "./components/SectorGroup";

const sectorMap: Record<string, string> = {
  "HDFC Bank": "Financial Sector",
  "Bajaj Finance": "Financial Sector",
  "ICICI Bank": "Financial Sector",
  "Bajaj Housing": "Financial Sector",
  "Savani Financials": "Financial Sector",
  "SBI Life": "Financial Sector",

  "Affle India": "Technology Sector",
  "LTI Mindtree": "Technology Sector",
  "KPIT Tech": "Technology Sector",
  "Tata Tech": "Technology Sector",
  "BLS E-Services": "Technology Sector",
  "Tanla": "Technology Sector",
  "Infy": "Technology Sector",
  "Happiest Mind": "Technology Sector",
  "Easemytrip": "Technology Sector",

  "Dmart": "Consumer Sector",
  "Tata Consumer": "Consumer Sector",
  "Pidilite": "Consumer Sector",

  "Tata Power": "Power Sector",
  "KPI Green": "Power Sector",
  "Suzlon": "Power Sector",
  "Gensol": "Power Sector",

  "Hariot Pipes": "Pipe Sector",
  "Astral": "Pipe Sector",
  "Polycab": "Pipe Sector",

  "Clean Science": "Others",
  "Deepak Nitrite": "Others",
  "Fine Organic": "Others",
  "Gravita": "Others",
};

export default function Home() {
  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadPortfolio = async () => {
    try {
      setError("");
      const res = await fetchPortfolio();
      setData(res);
    } catch (err) {
      console.log(err);
      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    (async () => {
    await loadPortfolio();
  })();

    const interval = setInterval(() => {
      loadPortfolio();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  // Group by sector
  const groupedBySector = data.reduce((acc: Record<string, Stock[]>, stock) => {
    const sector = sectorMap[stock.stockName] || "Unknown Sector";

    if (!acc[sector]) {
      acc[sector] = [];
    }

    acc[sector].push(stock);
    return acc;
  }, {});

  return (
    <main className="p-6 max-w-7xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">📊 Portfolio Dashboard</h1>

      {loading && <p className="text-gray-500">Loading portfolio..fhhr.</p>}

      {error && <p className="text-red-600 font-semibold">{error}</p>}

      {!loading &&
        !error &&
        Object.keys(groupedBySector).map((sector) => (
          <SectorGroup
            key={sector}
            sectorName={sector}
            stocks={groupedBySector[sector]}
          />
        ))}
    </main>
  );
}