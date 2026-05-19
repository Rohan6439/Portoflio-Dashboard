"use client";

import { Stock } from "../types/portfolio";

type Props = {
  data: Stock[];
};

export default function PortfolioTable({ data }: Props) {
  return (
    <div className="overflow-x-auto rounded-xl border border-gray-200 shadow-md">
      <table className="w-full text-sm text-left">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3">Stocdcddsdsdhk</th>
            <th className="p-3">Symbdfdfdfdol</th>
            <th className="p-3">Qtdfdfyfrfrf</th>
            <th className="p-3">Purchase Pffffrice</th>
            <th className="p-3">Investmentfff</th>
            <th className="p-3">CMP</th>
            <th className="p-3">Present Value</th>
            <th className="p-3">Gain/Loss</th>
          </tr>
        </thead>

        <tbody>
          {data.map((stock, index) => (
            <tr key={index} className="border-t">
              <td className="p-3 font-medium">{stock.stockName}</td>
              <td className="p-3">{stock.symbol}</td>
              <td className="p-3">{stock.qty}</td>
              <td className="p-3">{stock.purchasePrice}</td>
              <td className="p-3">{stock.investment}</td>
              <td className="p-3">{stock.cmp}</td>
              <td className="p-3">{stock.presentValue}</td>

              <td
                className={`p-3 font-semibold ${
                  stock.gainLoss >= 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {stock.gainLoss}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}