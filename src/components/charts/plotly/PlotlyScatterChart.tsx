
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { cn } from "@/lib/utils";

interface PlotlyScatterChartProps {
  data: any[];
  title?: string;
  className?: string;
  style?: React.CSSProperties;
}

export function PlotlyScatterChart({ data, title, className, style }: PlotlyScatterChartProps) {
  const [isClient, setIsClient] = useState(false);
  const [zoomState, setZoomState] = useState<boolean>(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  // Format data for Plotly
  const plotData = [
    {
      x: data.map(item => item.x),
      y: data.map(item => item.y),
      mode: 'markers',
      type: 'scatter',
      name: 'Data Points',
      marker: {
        color: '#ef4444',
        size: data.map(item => item.z / 10),
        sizemode: 'diameter',
        sizeref: 0.5,
        sizemin: 5,
        opacity: 0.7
      }
    }
  ];

  const layout = {
    autosize: true,
    margin: { l: 50, r: 20, t: 30, b: 50 },
    height: 300,
    hovermode: 'closest',
    xaxis: {
      title: 'X-Value',
      gridcolor: '#f0f0f0',
      tickfont: { size: 12, color: '#888888' },
      range: zoomState ? undefined : [0, Math.max(...data.map(d => d.x)) + 2]
    },
    yaxis: {
      title: 'Y-Value',
      gridcolor: '#f0f0f0',
      tickfont: { size: 12, color: '#888888' },
      range: zoomState ? undefined : [3.5, 6.5]
    },
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)'
  };

  const config = {
    responsive: true,
    displayModeBar: false
  };

  const handleRelayout = () => {
    setZoomState(true);
  };

  const handleResetZoom = () => {
    setZoomState(false);
  };

  return (
    <div className={cn("chart-container relative", className)} style={style}>
      {title && <h3 className="text-lg font-medium mb-4">{title}</h3>}
      {zoomState && (
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
      <div className="w-full h-[300px]">
        <Plot
          data={plotData}
          layout={layout}
          config={config}
          onRelayout={handleRelayout}
          style={{ width: '100%', height: '100%' }}
        />
      </div>
    </div>
  );
}
