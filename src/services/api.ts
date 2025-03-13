
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

// Fallback mock data when API is unavailable
const MOCK_DATA = {
  // Line chart data
  line: [
    {"name": "Jan", "trace0": 100, "trace1": 120, "trace2": 90},
    {"name": "Feb", "trace0": 120, "trace1": 140, "trace2": 95},
    {"name": "Mar", "trace0": 140, "trace1": 160, "trace2": 100},
    {"name": "Apr", "trace0": 160, "trace1": 180, "trace2": 105},
    {"name": "May", "trace0": 180, "trace1": 200, "trace2": 110},
    {"name": "Jun", "trace0": 200, "trace1": 220, "trace2": 115},
  ],
  // Bar chart data
  bar: [
    {"name": "Product A", "value": 400},
    {"name": "Product B", "value": 300},
    {"name": "Product C", "value": 200},
    {"name": "Product D", "value": 100},
    {"name": "Product E", "value": 50},
  ],
  // Scatter chart data
  scatter: [
    {"x": 10, "y": 20, "size": 5, "name": "Point 1"},
    {"x": 15, "y": 25, "size": 10, "name": "Point 2"},
    {"x": 20, "y": 30, "size": 15, "name": "Point 3"},
    {"x": 25, "y": 35, "size": 20, "name": "Point 4"},
    {"x": 30, "y": 40, "size": 25, "name": "Point 5"},
  ],
  // Radar chart data
  radar: [
    {"subject": "Math", "A": 120, "B": 110, "fullMark": 150},
    {"subject": "Chinese", "A": 98, "B": 130, "fullMark": 150},
    {"subject": "English", "A": 86, "B": 130, "fullMark": 150},
    {"subject": "Geography", "A": 99, "B": 100, "fullMark": 150},
    {"subject": "Physics", "A": 85, "B": 90, "fullMark": 150},
    {"subject": "History", "A": 65, "B": 85, "fullMark": 150},
  ]
};

// Helper function to adjust mock data based on platform
const adjustMockDataForPlatform = (data: any, platform: string) => {
  const multiplier = 
    platform === 'amazon' ? 1.0 :
    platform === 'flipkart' ? 0.8 :
    platform === 'myntra' ? 0.9 :
    platform === 'ajio' ? 0.7 : 
    platform === 'shopify' ? 1.2 : 1.0;
  
  // Create deep copy to avoid mutation
  const result = JSON.parse(JSON.stringify(data));
  
  // Apply multiplier to line data
  result.line.forEach((item: any) => {
    item.trace0 = Math.round(item.trace0 * multiplier);
    item.trace1 = Math.round(item.trace1 * multiplier);
    item.trace2 = Math.round(item.trace2 * multiplier);
  });
  
  // Apply multiplier to bar data
  result.bar.forEach((item: any) => {
    item.value = Math.round(item.value * multiplier);
  });
  
  // Apply multiplier to scatter data
  result.scatter.forEach((item: any) => {
    item.x = Math.round(item.x * multiplier);
    item.y = Math.round(item.y * multiplier);
    item.size = Math.round(item.size * multiplier);
  });
  
  // Apply multiplier to radar data
  result.radar.forEach((item: any) => {
    if ('A' in item) item.A = Math.round(item.A * multiplier);
    if ('B' in item) item.B = Math.round(item.B * multiplier);
  });
  
  return result;
};

export const fetchDashboardData = async (platform: string, startDate: Date, endDate: Date): Promise<ApiResponse> => {
  try {
    // Format dates for API request
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    // Try to fetch data from the FastAPI backend
    console.log(`Fetching data from ${API_BASE_URL}/api/dashboard?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`);
    
    // Set timeout to prevent long waits when backend is unavailable
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.detail || 'Failed to fetch data from API');
    }
    
    const data = await response.json();
    
    console.log("Successfully fetched data from API:", data);
    
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
    
    // If we can't connect to the API, use the mock data as fallback
    console.log(`Using mock data for platform: ${platform}`);
    const mockData = adjustMockDataForPlatform(MOCK_DATA, platform);
    
    return {
      success: true, // Still mark as success since we're providing fallback data
      data: mockData,
      error: error instanceof Error 
        ? `API unavailable (using mock data): ${error.message}` 
        : 'API unavailable (using mock data): An unknown error occurred'
    };
  }
};

// Individual API functions - with mock fallbacks
export const fetchLineChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/line-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch line chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching line chart data:', error);
    // Return mock data as fallback
    const mockData = adjustMockDataForPlatform(MOCK_DATA, platform);
    return mockData.line;
  }
};

export const fetchBarChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/bar-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch bar chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching bar chart data:', error);
    // Return mock data as fallback
    const mockData = adjustMockDataForPlatform(MOCK_DATA, platform);
    return mockData.bar;
  }
};

export const fetchScatterChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/scatter-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch scatter chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching scatter chart data:', error);
    // Return mock data as fallback
    const mockData = adjustMockDataForPlatform(MOCK_DATA, platform);
    return mockData.scatter;
  }
};

export const fetchRadarChartData = async (platform: string, startDate: Date, endDate: Date): Promise<any[]> => {
  try {
    const formattedStartDate = startDate.toISOString().split('T')[0];
    const formattedEndDate = endDate.toISOString().split('T')[0];
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    const response = await fetch(
      `${API_BASE_URL}/api/dashboard/radar-chart?platform=${platform}&start_date=${formattedStartDate}&end_date=${formattedEndDate}`,
      { signal: controller.signal }
    );
    
    clearTimeout(timeoutId);
    
    if (!response.ok) {
      throw new Error('Failed to fetch radar chart data');
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching radar chart data:', error);
    // Return mock data as fallback
    const mockData = adjustMockDataForPlatform(MOCK_DATA, platform);
    return mockData.radar;
  }
};
