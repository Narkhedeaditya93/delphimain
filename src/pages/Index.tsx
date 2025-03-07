
import { useState } from "react";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ActiveFilters } from "@/components/dashboard/ActiveFilters";
import { LineChart } from "@/components/charts/LineChart";
import { BarChart } from "@/components/charts/BarChart";
import { ScatterChart } from "@/components/charts/ScatterChart";
import { RadarChart } from "@/components/charts/RadarChart";

// Sample data for the charts
const lineData = [
  { name: "1", trace0: 10, trace1: 15, trace2: 12 },
  { name: "2", trace0: 15, trace1: 10, trace2: 9 },
  { name: "3", trace0: 13, trace1: 5, trace2: 15 },
  { name: "4", trace0: 17, trace1: 11, trace2: 12 },
  { name: "5", trace0: 16, trace1: 9, trace2: 9 },
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

const scatterData = Array.from({ length: 30 }, (_, i) => ({
  x: i + Math.random() * 5,
  y: 4 + Math.random() * 1.5,
  z: Math.random() * 100,
}));

const radarData = [
  { subject: "Metric A", trace0: 0.8, trace1: 0.7, trace2: 0.9 },
  { subject: "Metric B", trace0: 0.6, trace1: 0.9, trace2: 0.7 },
  { subject: "Metric C", trace0: 0.9, trace1: 0.8, trace2: 0.6 },
  { subject: "Metric D", trace0: 0.7, trace1: 0.6, trace2: 0.8 },
  { subject: "Metric E", trace0: 0.8, trace1: 0.7, trace2: 0.7 },
];

const Index = () => {
  const [filters, setFilters] = useState({
    platform: "amazon",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
  });

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      platform: "amazon",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    });
  };

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

        <div className="grid gap-6 md:grid-cols-2">
          <LineChart
            data={lineData}
            title="Line and Scatter Styling"
            className="animate-fade-up"
            style={{ animationDelay: "100ms" }}
          />
          <ScatterChart
            data={scatterData}
            title="Scatter Plot with a Color Dimension"
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          />
          <BarChart
            data={barData}
            title="2013 Sales Report"
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          />
          <RadarChart
            data={radarData}
            title="User Zoom Persists When uirevision Unchanged"
            className="animate-fade-up"
            style={{ animationDelay: "250ms" }}
          />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
