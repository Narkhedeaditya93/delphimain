
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
}

export function RadarChart({ data, title, className }: RadarChartProps) {
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
        <RechartsRadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
          <PolarGrid />
          <PolarAngleAxis dataKey="subject" fontSize={12} />
          <PolarRadiusAxis angle={30} domain={[0, 1]} />
          <Tooltip
            contentStyle={{
              backgroundColor: "white",
              border: "1px solid #f0f0f0",
              borderRadius: "6px",
              boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.05)",
            }}
          />
          <Legend />
          <Radar
            name="Trace 0"
            dataKey="trace0"
            stroke="#ef4444"
            fill="#ef4444"
            fillOpacity={0.2}
          />
          <Radar
            name="Trace 1"
            dataKey="trace1"
            stroke="#0ea5e9"
            fill="#0ea5e9"
            fillOpacity={0.2}
          />
          <Radar
            name="Trace 2"
            dataKey="trace2"
            stroke="#8b5cf6"
            fill="#8b5cf6"
            fillOpacity={0.2}
          />
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
}
