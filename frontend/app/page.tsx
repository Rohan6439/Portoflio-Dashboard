"use client";

import { useEffect, useState } from "react";
import PortfolioTable from "./components/PortfolioTable";
import PortfolioCharts from "./components/PortfolioCharts";

import { fetchPortfolio } from "./services/api";
import { Stock } from "./types/portfolio";

export default function Home() {
  const [data, setData] = useState<Stock[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [lastUpdated, setLastUpdated] = useState("");

  const loadPortfolio = async () => {
    try {
    
      const res = await fetchPortfolio();

      setData(res);

      setLastUpdated(
        new Date().toLocaleTimeString()
      );

      setError("");
    } catch (err) {
      console.log(err);

      setError("Failed to load portfolio data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadPortfolio();

    const interval = setInterval(() => {
      loadPortfolio();
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  const totalInvestment = data.reduce(
    (sum, stock) => sum + stock.investment,
    0
  );

  const totalPresentValue = data.reduce(
    (sum, stock) => sum + stock.presentValue,
    0
  );

  const totalGainLoss = data.reduce(
    (sum, stock) => sum + stock.gainLoss,
    0
  );

  return (
    <main className="min-h-screen bg-gray-100 p-6">

      <div className="max-w-7xl mx-auto">

        <div className="mb-8 text-center">

          <h1 className="text-5xl font-bold text-black">
            📊 Portfolio Dashboard
          </h1>

       

          <p className="text-sm text-gray-400 mt-2">
            Last Updated: {lastUpdated}
          </p>

        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          {/* Investment */}
          <div className="bg-linear-to-r from-blue-500 to-blue-700 text-white rounded-2xl shadow-lg p-6">

            <p className="text-sm mb-2">
              Total Investment
            </p>

            <h2 className="text-3xl font-bold">
              ₹ {totalInvestment.toFixed(2)}
            </h2>

          </div>

          {/* Present Value */}
          <div className="bg-linear-to-r from-purple-500 to-purple-700 text-white rounded-2xl shadow-lg p-6">

            <p className="text-sm mb-2">
              Present Value
            </p>

            <h2 className="text-3xl font-bold">
              ₹ {totalPresentValue.toFixed(2)}
            </h2>

          </div>

          {/* Gain/Loss */}
          <div
            className={`text-white rounded-2xl shadow-lg p-6 ${
              totalGainLoss >= 0
                ? "bg-linear-to-r from-green-500 to-green-700"
                : "bg-linear-to-r from-red-500 to-red-700"
            }`}
          >

            <p className="text-sm mb-2">
              Total Gain/Loss
            </p>

            <h2 className="text-3xl font-bold">
              ₹ {totalGainLoss.toFixed(2)}
            </h2>

          </div>

        </div>

        {/* Charts */}
        {!loading && !error && (
          <PortfolioCharts data={data} />
        )}

        {/* Loading */}
        {loading && (
          <p className="text-center">
            Loading...
          </p>
        )}

        {/* Error */}
        {error && (
          <p className="text-center text-red-600">
            {error}
          </p>
        )}

        {/* Table */}
        {!loading && !error && (
          <PortfolioTable data={data} />
        )}

      </div>
    </main>
  );
}