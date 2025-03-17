interface StockFilterProps {
    value: string | number;
    onChange: (value: string | number ) => void;
    options: { label: string; value: string | number }[];
  }
  
export default function StockFilter({ value, onChange, options }: StockFilterProps) {
    return (
        <select className="border p-2 m-2" value={value} onChange={(e) => onChange(Number(e.target.value))}>
        {options.map((option) => (
            <option key={option.value} value={option.value}>
            {option.label}
            </option>
        ))}
        </select>
    );
}