const express = require("express");
const cors = require("cors");
const XLSX = require("xlsx");

const YahooFinance = require("yahoo-finance2").default;

const yahooFinance = new YahooFinance();

const symbolMap = {
  "HDFC Bank": "HDFCBANK.NS",
  "Bajaj Finance": "BAJFINANCE.NS",
  "ICICI Bank": "ICICIBANK.NS",
  "Bajaj Housing": "BAJAJHFL.NS",
  "Savani Financials": "SAVFIN.NS",

  "Affle India": "AFFLE.NS",
  "LTI Mindtree": "LTIM.NS",
  "KPIT Tech": "KPITTECH.NS",
  "Tata Tech": "TATATECH.NS",
  "BLS E-Services": "BLSE.NS",
  "Tanla": "TANLA.NS",

  "Dmart": "DMART.NS",
  "Tata Consumer": "TATACONSUM.NS",
  "Pidilite": "PIDILITIND.NS",

  "Tata Power": "TATAPOWER.NS",
  "KPI Green": "KPIGREEN.NS",
  "Suzlon": "SUZLON.NS",
  "Gensol": "GENSOL.NS",

  "Hariot Pipes": "HARIOMPIPE.NS",
  "Astral": "ASTRAL.NS",
  "Polycab": "POLYCAB.NS",

  "Clean Science": "CLEAN.NS",
  "Deepak Nitrite": "DEEPAKNTR.NS",
  "Fine Organic": "FINEORG.NS",
  "Gravita": "GRAVITA.NS",
  "SBI Life": "SBILIFE.NS",

  "Infy": "INFY.NS",
  "Happiest Mind": "HAPPSTMNDS.NS",
  "Easemytrip": "EASEMYTRIP.NS",
};

const app = express();

app.use(cors());

const workbook = XLSX.readFile("portfolio.xlsx");

const sheetName = workbook.SheetNames[0];

const sheet = workbook.Sheets[sheetName];

const rawData = XLSX.utils.sheet_to_json(sheet, {
  range: 1,
});

const data = rawData.filter(
  (item) => item["Particulars"]
);

const cache = {};

const CACHE_TIME = 5 * 60 * 1000;

async function getStockData(symbol) {
  try {
    const now = Date.now();

   
    if (
      cache[symbol] &&
      now - cache[symbol].timestamp < CACHE_TIME
    ) {
      return cache[symbol].data;
    }

   

    const result = await yahooFinance.quote(symbol);
    console.log(result);

    if (!result) {
      return {
        cmp: 0,
        peRatio: 0,
        earnings: 0,
      };
    }

    const stockData = {
      cmp: result.regularMarketPrice || 0,

      peRatio: result.trailingPE || 0,

      earnings:
        result.epsTrailingTwelveMonths || 0,
    };

   
    cache[symbol] = {
      data: stockData,
      timestamp: now,
    };

    return stockData;
  } catch (error) {
    console.log("Yahoo Error for", symbol);
console.log(error);

    return {
      cmp: 0,
      peRatio: 0,
      earnings: 0,
    };
  }
}

app.get("/portfolio", async (req, res) => {
  try {
   
    const totalInvestment = data.reduce(
      (sum, stock) => {
        const qty = stock["Qty"] || 0;

        const purchasePrice =
          stock["Purchase Price"] || 0;

        return sum + qty * purchasePrice;
      },
      0
    );

    const updatedData = await Promise.all(
      data.map(async (stock) => {
        const stockName = stock["Particulars"];

        const symbol = symbolMap[stockName];

        if (!symbol) return null;

        const marketData = await getStockData(
          symbol
        );

        const qty = stock["Qty"] || 0;

        const purchasePrice =
          stock["Purchase Price"] || 0;

        const investment =
          purchasePrice * qty;

        const presentValue =
          marketData.cmp * qty;

        const gainLoss =
          presentValue - investment;

        const portfolioPercent =
          (investment / totalInvestment) * 100;

        return {
        

          stockName,

          symbol,

          exchange: "NSE",

          qty,

          purchasePrice,

          investment: Number(
            investment.toFixed(2)
          ),

          portfolioPercent: Number(
            portfolioPercent.toFixed(2)
          ),

          cmp: Number(
            marketData.cmp.toFixed(2)
          ),

          presentValue: Number(
            presentValue.toFixed(2)
          ),

          gainLoss: Number(
            gainLoss.toFixed(2)
          ),

          peRatio: Number(
            marketData.peRatio.toFixed(2)
          ),

          latestEarnings:
            marketData.earnings,
        };
      })
    );

    const filteredData =
      updatedData.filter(Boolean);

    res.json(filteredData);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      error: "Something went wrong",
    });
  }
});

app.get("/", (req, res) => {
  res.send("Portfolio API Running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});