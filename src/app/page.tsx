"use client";

import { useState } from "react";
import { useStockData } from "@/hooks/useStockData";
import StockTable from "@/components/StockTable";
import StockFilter from "@/components/StockFilter";
import { FilterValues } from "@/models/DU/filterValues";
import { RefreshIntervalValues } from "@/models/DU/refreshIntervalValues";

export default function StockMonitor() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState(FilterValues.All);
  const [refreshInterval, setRefreshInterval] = useState(RefreshIntervalValues.Long);
  const stocksData = useStockData(refreshInterval);

  const filteredStocks = stocksData.filter((stock) => {
    if (search && !stock.symbol.toLowerCase().includes(search.toLowerCase())) return false;
    if (filter === FilterValues.Up && stock.diffPrice <= 0) return false;
    if (filter === FilterValues.Down && stock.diffPrice >= 0) return false;
    return true;
  });

  const handleFilterChange = (value: string | number) => {
    setFilter(value as FilterValues);
  };

  const handleIntervalChange = (value: string | number) => {
    setRefreshInterval(value as RefreshIntervalValues)
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Биржевой монитор</h1>
      <input
        type="text"
        placeholder="Поиск по символу"
        className="border p-2 m-2"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <StockFilter
        value={filter}
        onChange={handleFilterChange}
        options={[
          { label: 'Все', value: FilterValues.All },
          { label: 'Только растущие', value: FilterValues.Up },
          { label: 'Только падающие', value: FilterValues.Down },
        ]}
      />
      <StockFilter
        value={refreshInterval}
        onChange={handleIntervalChange}
        options={[
          { label: `${RefreshIntervalValues.Short * 0.001} сек`, value: RefreshIntervalValues.Short },
          { label: `${RefreshIntervalValues.Medium * 0.001} сек`, value: RefreshIntervalValues.Medium },
          { label: `${RefreshIntervalValues.Long * 0.001} сек`, value: RefreshIntervalValues.Long },
        ]}
      />
      <StockTable stocks={filteredStocks} />
    </div>
  );
}