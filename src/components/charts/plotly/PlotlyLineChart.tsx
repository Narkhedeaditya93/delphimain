
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { cn } from "@/lib/utils";

interface PlotlyLineChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PlotlyLineChart({ data, title, className, style }: PlotlyLineChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [selectedPoint, setSelectedPoint] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Format data for Plotly
  const plotData = [
    {
      x: data.map(item => item.name),
      y: data.map(item => item.trace0),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Trace 0',
      line: { color: '#ef4444' },
      marker: { size: 8 }
    },
    {
      x: data.map(item => item.name),
      y: data.map(item => item.trace1),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Trace 1',
      line: { color: '#0ea5e9' },
      marker: { size: 8 }
    },
    {
      x: data.map(item => item.name),
      y: data.map(item => item.trace2),
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Trace 2',
      line: { color: '#8b5cf6' },
      marker: { size: 8 }
    }
  ];

  const layout = {
    autosize: true,
    margin: { l: 50, r: 20, t: 30, b: 50 },
    height: 300,
    hovermode: 'closest',
    xaxis: {
      gridcolor: '#f0f0f0',
      tickfont: { size: 12, color: '#888888' }
    },
    yaxis: {
      gridcolor: '#f0f0f0',
      tickfont: { size: 12, color: '#888888' }
    },
    legend: {
      orientation: 'h',
      y: -0.2
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  const handleClick = (event: any) => {
    if (event.points && event.points.length > 0) {
      const point = event.points[0];
      setSelectedPoint(data[point.pointIndex].name);
    }
  };

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {selectedPoint && (
        <div className="absolute top-8 right-4 bg-white/90 p-2 rounded-md shadow-sm border border-gray-100 text-sm">
          <p className="font-medium">Selected: {selectedPoint}</p>
          <button 
            className="text-xs text-blue-500 hover:underline mt-1"
            onClick={() => setSelectedPoint(null)}
          >
            Clear selection
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
