"use client";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

import { Stock } from "../types/portfolio";

type Props = {
  data: Stock[];
};

const COLORS = [
  "#2563eb",
  "#16a34a",
  "#dc2626",
  "#9333ea",
  "#f59e0b",
  "#0f766e",
];

export default function PortfolioCharts({
  data,
}: Props) {
  const pieData = data.map((stock) => ({
    name: stock.stockName,
    value: stock.presentValue,
  }));

  const barData = data.map((stock) => ({
    name: stock.symbol,
    gainLoss: stock.gainLoss,
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">

      {/* Pie Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-5 border">

        <h2 className="text-2xl font-bold mb-5">
          Portfolio Distribution
        </h2>

        <div className="h-87.5">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>

              <Pie
                data={pieData}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius={120}
                label
              >
                {pieData.map((_, index) => (
                  <Cell
                    key={index}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>

              <Tooltip />

            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-2xl shadow-lg p-5 border">

        <h2 className="text-2xl font-bold mb-5">
          Gain / Loss
        </h2>

        <div className="h-87.5">
          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={barData}>
  <CartesianGrid strokeDasharray="3 3" />

  <XAxis dataKey="name" />
  <YAxis />

  <Tooltip />

  <Bar
    dataKey="gainLoss"
    radius={[10, 10, 0, 0]}
  >
    {barData.map((entry, index) => (
      <Cell
        key={`cell-${index}`}
        fill={
          entry.gainLoss >= 0
            ? "#16a34a" // Green
            : "#dc2626" // Red
        }
      />
    ))}
  </Bar>

</BarChart>

          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}