
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
  style?: React.CSSProperties;
}

export function ScatterChart({ data, title, className, style }: ScatterChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [zoomDomain, setZoomDomain] = useState<{ x: number[], y: number[] } | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  const handleZoom = (domain: { x: number[], y: number[] }) => {
    setZoomDomain(domain);
  };

  const handleResetZoom = () => {
    setZoomDomain(null);
  };

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {zoomDomain && (
        <div className="absolute top-8 right-4 bg-white/90 p-2 rounded-md shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">Zoomed View</p>
          <button 
            className="text-xs text-blue-500 hover:underline mt-1"
            onClick={handleResetZoom}
          >
            Reset zoom
          </button>
        </div>
      )}
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
            domain={zoomDomain ? zoomDomain.x : [0, 'dataMax + 5']}
            allowDataOverflow
          />
          <YAxis
            type="number"
            dataKey="y"
            name="Y-Value"
            stroke="#888888"
            fontSize={12}
            domain={zoomDomain ? zoomDomain.y : [3.5, 6.5]}
            allowDataOverflow
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
            onClick={(data) => {
              console.log("Point clicked:", data);
            }}
          />
        </RechartsScatterChart>
      </ResponsiveContainer>
    </div>
  );
}
