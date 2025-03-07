
import { useState, useEffect } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ActiveFilters } from "@/components/dashboard/ActiveFilters";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { ScatterChart } from "@/components/charts/ScatterChart";
import { RadarChart } from "@/components/charts/RadarChart";
import { toast } from "sonner";

// Sample data for the charts
const lineData = [
  { name: "Jan", trace0: 10, trace1: 15, trace2: 12 },
  { name: "Feb", trace0: 15, trace1: 10, trace2: 9 },
  { name: "Mar", trace0: 13, trace1: 5, trace2: 15 },
  { name: "Apr", trace0: 17, trace1: 11, trace2: 12 },
  { name: "May", trace0: 16, trace1: 9, trace2: 9 },
  { name: "Jun", trace0: 19, trace1: 12, trace2: 14 },
];

const barData = [
  { name: "Jan", primaryProduct: 20, secondaryProduct: 19 },
  { name: "Feb", primaryProduct: 24, secondaryProduct: 22 },
  { name: "Mar", primaryProduct: 18, secondaryProduct: 17 },
  { name: "Apr", primaryProduct: 21, secondaryProduct: 20 },
  { name: "May", primaryProduct: 19, secondaryProduct: 18 },
  { name: "Jun", primaryProduct: 23, secondaryProduct: 21 },
  { name: "Jul", primaryProduct: 25, secondaryProduct: 24 },
  { name: "Aug", primaryProduct: 22, secondaryProduct: 21 },
];

const generateScatterData = (count: number) => {
  return Array.from({ length: count }, (_, i) => ({
    x: i + Math.random() * 5,
    y: 4 + Math.random() * 1.5,
    z: Math.random() * 100,
  }));
};

const radarData = [
  { subject: "Metric A", trace0: 0.8, trace1: 0.7, trace2: 0.9 },
  { subject: "Metric B", trace0: 0.6, trace1: 0.9, trace2: 0.7 },
  { subject: "Metric C", trace0: 0.9, trace1: 0.8, trace2: 0.6 },
  { subject: "Metric D", trace0: 0.7, trace1: 0.6, trace2: 0.8 },
  { subject: "Metric E", trace0: 0.8, trace1: 0.7, trace2: 0.7 },
];

const platformDataMap = {
  amazon: {
    line: lineData,
    bar: barData,
    scatter: generateScatterData(30),
    radar: radarData
  },
  flipkart: {
    line: lineData.map(item => ({ ...item, trace0: item.trace0 * 0.8, trace1: item.trace1 * 0.9, trace2: item.trace2 * 0.85 })),
    bar: barData.map(item => ({ ...item, primaryProduct: item.primaryProduct * 0.85, secondaryProduct: item.secondaryProduct * 0.8 })),
    scatter: generateScatterData(28),
    radar: radarData.map(item => ({ ...item, trace0: item.trace0 * 0.85, trace1: item.trace1 * 0.8, trace2: item.trace2 * 0.9 }))
  },
  myntra: {
    line: lineData.map(item => ({ ...item, trace0: item.trace0 * 1.1, trace1: item.trace1 * 0.95, trace2: item.trace2 * 1.05 })),
    bar: barData.map(item => ({ ...item, primaryProduct: item.primaryProduct * 1.05, secondaryProduct: item.secondaryProduct * 1.1 })),
    scatter: generateScatterData(35),
    radar: radarData.map(item => ({ ...item, trace0: Math.min(1, item.trace0 * 1.05), trace1: Math.min(1, item.trace1 * 1.1), trace2: Math.min(1, item.trace2 * 1.0) }))
  },
  ajio: {
    line: lineData.map(item => ({ ...item, trace0: item.trace0 * 0.75, trace1: item.trace1 * 1.2, trace2: item.trace2 * 0.9 })),
    bar: barData.map(item => ({ ...item, primaryProduct: item.primaryProduct * 0.8, secondaryProduct: item.secondaryProduct * 1.05 })),
    scatter: generateScatterData(22),
    radar: radarData.map(item => ({ ...item, trace0: item.trace0 * 0.9, trace1: item.trace1 * 1.1, trace2: item.trace2 * 0.95 }))
  },
  shopify: {
    line: lineData.map(item => ({ ...item, trace0: item.trace0 * 0.6, trace1: item.trace1 * 1.3, trace2: item.trace2 * 1.1 })),
    bar: barData.map(item => ({ ...item, primaryProduct: item.primaryProduct * 0.9, secondaryProduct: item.secondaryProduct * 1.1 })),
    scatter: generateScatterData(20),
    radar: radarData.map(item => ({ ...item, trace0: item.trace0 * 0.8, trace1: item.trace1 * 1.2, trace2: item.trace2 * 1.0 }))
  }
};

const Index = () => {
  const [filters, setFilters] = useState({
    platform: "amazon",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
  });
  
  const [chartData, setChartData] = useState({
    line: platformDataMap.amazon.line,
    bar: platformDataMap.amazon.bar,
    scatter: platformDataMap.amazon.scatter,
    radar: platformDataMap.amazon.radar
  });
  
  const [isLoading, setIsLoading] = useState(false);

  const handleFilterChange = (newFilters: any) => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setFilters(newFilters);
      setChartData(platformDataMap[newFilters.platform as keyof typeof platformDataMap]);
      setIsLoading(false);
      
      toast.success(`Dashboard updated with ${newFilters.platform} data`);
    }, 800);
  };

  const handleClearFilters = () => {
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const defaultFilters = {
        platform: "amazon",
        startDate: new Date(),
        endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
      };
      
      setFilters(defaultFilters);
      setChartData(platformDataMap.amazon);
      setIsLoading(false);
      
      toast.info("Filters reset to default");
    }, 500);
  };

  useEffect(() => {
    toast.success("Dashboard loaded successfully");
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Dashboard</h1>
          <p className="text-muted-foreground mt-1 animate-fade-up" style={{ animationDelay: "50ms" }}>
            Analytics and visualizations for your platform performance.
          </p>
        </div>

        <FilterPanel onFilterChange={handleFilterChange} />
        <ActiveFilters
          filters={filters}
          onRemove={handleClearFilters}
        />

        <div className={`grid gap-6 md:grid-cols-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-300`}>
          <LineChart
            data={chartData.line}
            title="Monthly Performance Metrics"
            className="animate-fade-up"
            style={{ animationDelay: "100ms" }}
          />
          <ScatterChart
            data={chartData.scatter}
            title="Distribution Analysis"
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          />
          <BarChart
            data={chartData.bar}
            title="Product Sales Comparison"
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          />
          <RadarChart
            data={chartData.radar}
            title="Performance Metrics Comparison"
            className="animate-fade-up"
            style={{ animationDelay: "250ms" }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
