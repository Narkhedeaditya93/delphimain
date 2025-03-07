
import { useEffect, useState } from "react";
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface BarChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function BarChart({ data, title, className, style }: BarChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedBar, setSelectedBar] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleBarClick = (data: any, index: number) => {
    console.log("Bar clicked:", data, index);
    setSelectedBar(data.name);
  };

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {selectedBar && (
        <div className="absolute top-8 right-4 bg-white/90 p-2 rounded-md shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">Selected: {selectedBar}</p>
          <button 
            className="text-xs text-blue-500 hover:underline mt-1"
            onClick={() => setSelectedBar(null)}
          >
            Clear selection
          </button>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onClick={handleBarClick}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="name" stroke="#888888" fontSize={12} />
          <YAxis stroke="#888888" fontSize={12} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend />
          <Bar 
            dataKey="primaryProduct" 
            fill={selectedBar ? "#0ea5e9" : "#0ea5e9"}
            radius={[4, 4, 0, 0]} 
            onClick={(data, index) => handleBarClick(data, index)}
            cursor="pointer"
            animationDuration={300}
          />
          <Bar 
            dataKey="secondaryProduct" 
            fill={selectedBar ? "#8b5cf6" : "#8b5cf6"} 
            radius={[4, 4, 0, 0]} 
            onClick={(data, index) => handleBarClick(data, index)}
            cursor="pointer"
            animationDuration={300}
          />
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
