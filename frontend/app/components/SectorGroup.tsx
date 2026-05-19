import { Stock } from "../types/portfolio";
import PortfolioTable from "./PortfolioTable";

type Props = {
  sectorName: string;
  stocks: Stock[];
};

export default function SectorGroup({ sectorName, stocks }: Props) {
  const totalInvestment = stocks.reduce((sum, s) => sum + s.investment, 0);
  const totalPresentValue = stocks.reduce((sum, s) => sum + s.presentValue, 0);
  const totalGainLoss = totalPresentValue - totalInvestment;

  return (
    <div className="mb-10 p-5 border rounded-xl shadow-md bg-white">
      <h2 className="text-xl font-bold mb-3">{sectorName}</h2>

      <div className="flex flex-wrap gap-6 mb-5 text-sm">
        <p className="font-semibold">
          Total Investment:{" "}
          <span className="font-normal">{totalInvestment.toFixed(2)}</span>
        </p>

        <p className="font-semibold">
          Total Present Value:{" "}
          <span className="font-normal">{totalPresentValue.toFixed(2)}</span>
        </p>

        <p
          className={`font-semibold ${
            totalGainLoss >= 0 ? "text-green-600" : "text-red-600"
          }`}
        >
          Gain/Loss: {totalGainLoss.toFixed(2)}
        </p>
      </div>

      <PortfolioTable data={stocks} />
    </div>
  );
}