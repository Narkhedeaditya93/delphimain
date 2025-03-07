
import { useEffect, useState } from "react";
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ZAxis,
} from "recharts";
import { cn } from "@/lib/utils";

interface ScatterChartProps {
  data: any[];
  title?: string;
  className?: string;
}

export function ScatterChart({ data, title, className }: ScatterChartProps) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={cn("chart-container animate-fade-up", className)}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsScatterChart
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            type="number"
            dataKey="x"
            name="X-Value"
            stroke="#888888"
            fontSize={12}
            domain={[0, 'dataMax + 5']}
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y-Value"
            stroke="#888888"
            fontSize={12}
            domain={[3.5, 6.5]}
          />
          <ZAxis
            type="number"
            dataKey="z"
            range={[50, 500]}
            name="Value"
          />
          <Tooltip
            cursor={{ strokeDasharray: '3 3' }}
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend />
          <Scatter
            name="Data Points"
            data={data}
            fill="#ef4444"
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
