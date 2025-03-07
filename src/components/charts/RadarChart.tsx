
import { useEffect, useState } from "react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Legend,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { cn } from "@/lib/utils";

interface RadarChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function RadarChart({ data, title, className, style }: RadarChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {selectedCategory && (
        <div className="absolute top-8 right-4 bg-white/90 p-2 rounded-md shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">Focused: {selectedCategory}</p>
          <button 
            className="text-xs text-blue-500 hover:underline mt-1"
            onClick={() => setSelectedCategory(null)}
          >
            Show all
          </button>
        </div>
      )}
      <ResponsiveContainer width="100%" height={300}>
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis 
            dataKey="subject" 
            fontSize={12}
            onClick={(data) => {
              if (data && data.value) {
                setSelectedCategory(data.value.toString());
              }
            }}
            tick={{ cursor: 'pointer' }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 1]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend 
            onClick={(data) => {
              console.log("Legend clicked:", data);
            }}
          />
          <Radar
            name="Trace 0"
            dataKey="trace0"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={selectedCategory ? 0.1 : 0.2}
            animationDuration={500}
          />
          <Radar
            name="Trace 1"
            dataKey="trace1"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={selectedCategory ? 0.1 : 0.2}
            animationDuration={500}
          />
          <Radar
            name="Trace 2"
            dataKey="trace2"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={selectedCategory ? 0.1 : 0.2}
            animationDuration={500}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
