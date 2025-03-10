
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { cn } from "@/lib/utils";

interface PlotlyRadarChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PlotlyRadarChart({ data, title, className, style }: PlotlyRadarChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Format data for Plotly
  const categories = data.map(item => item.subject);
  
  const plotData = [
    {
      type: 'scatterpolar',
      r: data.map(item => item.trace0),
      theta: categories,
      fill: 'toself',
      name: 'Trace 0',
      line: { color: '#ef4444' },
      fillcolor: 'rgba(239, 68, 68, 0.2)'
    },
    {
      type: 'scatterpolar',
      r: data.map(item => item.trace1),
      theta: categories,
      fill: 'toself',
      name: 'Trace 1',
      line: { color: '#0ea5e9' },
      fillcolor: 'rgba(14, 165, 233, 0.2)'
    },
    {
      type: 'scatterpolar',
      r: data.map(item => item.trace2),
      theta: categories,
      fill: 'toself',
      name: 'Trace 2',
      line: { color: '#8b5cf6' },
      fillcolor: 'rgba(139, 92, 246, 0.2)'
    }
  ];

  const layout = {
    autosize: true,
    margin: { l: 50, r: 50, t: 30, b: 30 },
    height: 300,
    polar: {
      radialaxis: {
        visible: true,
        range: [0, 1]
      }
    },
    legend: {
      orientation: 'h',
      y: -0.2
    },
    paper_bgcolor: 'rgba(0,0,0,0)'
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  const handleClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      if (point.theta) {
        setSelectedCategory(point.theta);
      }
    }
  };

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
      <div className="w-full h-[300px]">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          onClick={handleClick}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
