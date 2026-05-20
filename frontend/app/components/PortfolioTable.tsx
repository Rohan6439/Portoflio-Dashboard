"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Stock } from "../types/portfolio";

type Props = {
  data: Stock[];
};

export default function PortfolioTable({
  data,
}: Props) {

  const columns: ColumnDef<Stock>[] = [
    {
      accessorKey: "stockName",
      header: "Stock Name",
    },
     {
      accessorKey: "purchasePrice",
      header: "Purchase Price",

      cell: ({ row }) => (
        <span>
          ₹ {row.original.purchasePrice}
        </span>
      ),
    },
  
    {
      accessorKey: "qty",
      header: "Quantity(Qty)",
    },
   
    {
      accessorKey: "investment",
      header: "Investment",

      cell: ({ row }) => (
        <span>
          ₹ {row.original.investment.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "portfolioPercent",
      header: "Portfolio (%)",

      cell: ({ row }) => (
        <span>
          {row.original.portfolioPercent}%
        </span>
      ),
    },
     {
      accessorKey: "exchange",
      header: "NSE/BSE",
    },
    {
      accessorKey: "cmp",
      header: "CMP",

      cell: ({ row }) => (
        <span>
          ₹ {row.original.cmp}
        </span>
      ),
    },
    {
      accessorKey: "presentValue",
      header: "Present Value",

      cell: ({ row }) => (
        <span>
          ₹ {row.original.presentValue.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "gainLoss",
      header: "Gain/Loss",

      cell: ({ row }) => (
        <span
          className={`font-bold ${
            row.original.gainLoss >= 0
              ? "text-green-600"
              : "text-red-600"
          }`}
        >
          ₹ {row.original.gainLoss.toFixed(2)}
        </span>
      ),
    },
    {
      accessorKey: "peRatio",
      header: "P/E Ratio",
    },
    {
      accessorKey: "latestEarnings",
      header: "Latest Earnings",
    },
  ];

  // eslint-disable-next-line react-hooks/incompatible-library
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="overflow-x-auto bg-white rounded-xl shadow-md">

      <table className="min-w-full text-sm">

        {/* Table Head */}
        <thead className="bg-gray-200 text-gray-700">

          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>

              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="p-4 text-left font-semibold whitespace-nowrap"
                >
                  {flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </th>
              ))}

            </tr>
          ))}

        </thead>

        {/* Table Body */}
        <tbody>

          {table.getRowModel().rows.map((row) => (
            <tr
              key={row.id}
              className="border-b hover:bg-gray-50 transition"
            >

              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className="p-4 whitespace-nowrap"
                >
                  {flexRender(
                    cell.column.columnDef.cell,
                    cell.getContext()
                  )}
                </td>
              ))}

            </tr>
          ))}

        </tbody>

      </table>
    </div>
  );
}