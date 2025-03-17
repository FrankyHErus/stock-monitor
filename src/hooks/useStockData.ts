import { useState, useEffect } from "react";
import axios from "axios";
import { StockData } from "@/models/stocks/stocksData";

const API_URL = "https://finnhub.io/api/v1";

const topStocks = ["AAPL", "MSFT", "GOOGL", "AMZN", "ABT"];

const getStockPrice = async (symbol: string) => {
  try {
    const response = await axios.get(`${API_URL}/quote`, {
      params: { symbol, token: process.env.NEXT_PUBLIC_API_KEY },
    });
    return { symbol, ...response.data };
  } catch (ex) {
    console.error(ex);
  }
};

export function useStockData(refreshInterval: number) {
  const [stocksData, setStocksData] = useState<StockData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const results = await Promise.all(topStocks.map((stock) => getStockPrice(stock)));

      const stocksWithPrices = results
        .filter((stock) => stock)
        .map((stock) => ({
          symbol: stock.symbol,
          currentPrice: stock?.c,
          diffPrice: Number((stock?.c - stock?.o).toFixed(3)),
        }));

      setStocksData(stocksWithPrices);
    };

    fetchData();
    const interval = setInterval(fetchData, refreshInterval);
    return () => clearInterval(interval);
  }, [refreshInterval]);

  return stocksData;
}
