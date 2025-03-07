
import { useEffect, useState } from "react";
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";

interface LineChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function LineChart({ data, title, className, style }: LineChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [hoveredData, setHoveredData] = useState<any>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleMouseEnter = (data: any, index: number) => {
    setActiveIndex(index);
    setHoveredData(data);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
    setHoveredData(null);
  };

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {hoveredData && activeIndex !== null && (
        <div className="absolute top-8 right-4 bg-white/90 p-2 rounded-md shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">Point {hoveredData.name}</p>
          <p className="text-red-500">Value 1: {hoveredData.trace0}</p>
          <p className="text-blue-500">Value 2: {hoveredData.trace1}</p>
          <p className="text-purple-500">Value 3: {hoveredData.trace2}</p>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsLineChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          onMouseMove={(e) => {
            if (e.activeTooltipIndex !== undefined) {
              handleMouseEnter(data[e.activeTooltipIndex], e.activeTooltipIndex);
            }
          }}
          onMouseLeave={handleMouseLeave}
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
          <Legend 
            wrapperStyle={{ paddingTop: 10 }}
            onClick={(data) => {
              console.log("Legend clicked:", data);
            }}
          />
          <Line
            type="monotone"
            dataKey="trace0"
            stroke="#ef4444"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="trace1"
            stroke="#0ea5e9"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            dataKey="trace2"
            stroke="#8b5cf6"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
}
