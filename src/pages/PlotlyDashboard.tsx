
import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { FilterPanel } from "@/components/dashboard/FilterPanel";
import { ActiveFilters } from "@/components/dashboard/ActiveFilters";
import { PlotlyLineChart } from "@/components/charts/plotly/PlotlyLineChart";
import { PlotlyBarChart } from "@/components/charts/plotly/PlotlyBarChart";
import { PlotlyScatterChart } from "@/components/charts/plotly/PlotlyScatterChart";
import { PlotlyRadarChart } from "@/components/charts/plotly/PlotlyRadarChart";
import { toast } from "sonner";
import { fetchDashboardData } from "@/services/api";

const PlotlyDashboard = () => {
  const [filters, setFilters] = useState({
    platform: "amazon",
    startDate: new Date(),
    endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
  });
  
  const { 
    data: apiData, 
    isLoading, 
    isError, 
    error, 
    refetch 
  } = useQuery({
    queryKey: ['plotlyDashboardData', filters.platform, filters.startDate, filters.endDate],
    queryFn: () => fetchDashboardData(filters.platform, filters.startDate, filters.endDate),
    staleTime: 5 * 60 * 1000, // Consider data fresh for 5 minutes
  });

  const chartData = apiData?.success && apiData.data ? apiData.data : {
    line: [],
    bar: [],
    scatter: [],
    radar: []
  };

  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
    toast.info(`Updating dashboard with ${newFilters.platform} data...`);
  };

  const handleClearFilters = () => {
    const defaultFilters = {
      platform: "amazon",
      startDate: new Date(),
      endDate: new Date(new Date().setDate(new Date().getDate() + 10)),
    };
    
    setFilters(defaultFilters);
    toast.info("Filters reset to default");
  };

  useEffect(() => {
    if (isError && error) {
      toast.error(`Failed to fetch data: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } else if (apiData?.success) {
      toast.success(`Dashboard updated with ${filters.platform} data`);
    }
  }, [apiData, isError, error, filters.platform]);

  useEffect(() => {
    toast.success("Plotly Dashboard loaded successfully");
  }, []);

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-fade-up">Plotly Dashboard</h1>
          <p className="text-muted-foreground mt-1 animate-fade-up" style={{ animationDelay: "50ms" }}>
            Analytics and visualizations using Plotly.js charts.
          </p>
        </div>

        <FilterPanel onFilterChange={handleFilterChange} />
        <ActiveFilters
          filters={filters}
          onRemove={handleClearFilters}
        />

        {isError && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Error: </strong>
            <span className="block sm:inline">Failed to load dashboard data. Please try again later.</span>
          </div>
        )}

        <div className={`grid gap-6 md:grid-cols-2 ${isLoading ? 'opacity-50 pointer-events-none' : ''} transition-opacity duration-300`}>
          <PlotlyLineChart
            data={chartData.line}
            title="Monthly Performance Metrics"
            className="animate-fade-up"
            style={{ animationDelay: "100ms" }}
          />
          <PlotlyScatterChart
            data={chartData.scatter}
            title="Distribution Analysis"
            className="animate-fade-up"
            style={{ animationDelay: "150ms" }}
          />
          <PlotlyBarChart
            data={chartData.bar}
            title="Product Sales Comparison"
            className="animate-fade-up"
            style={{ animationDelay: "200ms" }}
          />
          <PlotlyRadarChart
            data={chartData.radar}
            title="Performance Metrics Comparison"
            className="animate-fade-up"
            style={{ animationDelay: "250ms" }}
          />
        </div>

        {isLoading && (
          <div className="flex justify-center items-center my-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          </div>
        )}

        <div className="flex justify-end mt-4">
          <button 
            onClick={() => refetch()} 
            className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            disabled={isLoading}
          >
            {isLoading ? 'Refreshing...' : 'Refresh Data'}
          </button>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PlotlyDashboard;
