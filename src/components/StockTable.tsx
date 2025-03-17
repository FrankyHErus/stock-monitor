import { StockData } from "@/models/stocks/stocksData";

interface StockTableProps {
  stocks: StockData[];
}

const getColorOfField = (value: number) => {
  if (value === 0) return;
  return value > 0 ? "bg-green-600" : "bg-red-600";
};

export default function StockTable({ stocks }: StockTableProps) {
  return (
    <table className="w-full border-collapse border border-gray-300 mt-4">
      <thead>
        <tr>
          <th className="border p-2">Символ</th>
          <th className="border p-2">Цена</th>
          <th className="border p-2">Изменение</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.symbol}>
            <td className="border p-2">{stock.symbol}</td>
            <td className="border p-2">{stock.currentPrice}$</td>
            <td className={`border p-2 ${getColorOfField(stock.diffPrice)}`}>
              {stock.diffPrice}$
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}