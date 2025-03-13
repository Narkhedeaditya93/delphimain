
// API service for fetching dashboard data from FastAPI backend

interface ApiResponse {
  success: boolean;
  data?: {
    line: any[];
    bar: any[];
    scatter: any[];
    radar: any[];
  };
  error?: string;
}

// API endpoint for FastAPI backend
const API_BASE_URL = 'http://localhost:8000';

export const fetchDashboardData = async (platform: string, startDate: Date, endDate: Date): Promise<ApiResponse> => {
  try {
    // Format dates for API request
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    // Fetch data from the FastAPI backend
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch data from API');
    }
    
    const data = await response.json();
    
    return {
      success: true,
      data: {
        line: data.line,
        bar: data.bar,
        scatter: data.scatter,
        radar: data.radar
      }
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};

// Individual API functions for each chart type if needed
export const fetchLineChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/line-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch line chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    return [];
  }
};

export const fetchBarChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/bar-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch bar chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    return [];
  }
};

export const fetchScatterChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/scatter-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch scatter chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching scatter chart data:', error);
    return [];
  }
};

export const fetchRadarChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/radar-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch radar chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching radar chart data:', error);
    return [];
  }
};
