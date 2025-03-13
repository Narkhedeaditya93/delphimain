
// API service for fetching dashboard data

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

// Sample mockup API endpoint - replace with your actual API endpoint
const API_BASE_URL = 'https://api.example.com';

export const fetchDashboardData = async (platform: string, startDate: Date, endDate: Date): Promise<ApiResponse> => {
  try {
    // In a real application, you would fetch from your actual API endpoint
    // Example: const response = await fetch(`${API_BASE_URL}/dashboard?platform=${platform}&startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}`);

    // For now, we'll simulate an API call with a timeout
    return new Promise((resolve) => {
      setTimeout(() => {
        // This is mockup data - replace with actual API call
        // In a real implementation, you would parse the response from your API
        
        // Generate some random variations based on platform for demo purposes
        const multiplier = {
          amazon: 1,
          flipkart: 0.85,
          myntra: 1.1,
          ajio: 0.9,
          shopify: 0.75
        }[platform] || 1;

        // Sample data structure that your API would return
        const mockResponse: ApiResponse = {
          success: true,
          data: {
            line: [
              { name: "Jan", trace0: 10 * multiplier, trace1: 15 * multiplier, trace2: 12 * multiplier },
              { name: "Feb", trace0: 15 * multiplier, trace1: 10 * multiplier, trace2: 9 * multiplier },
              { name: "Mar", trace0: 13 * multiplier, trace1: 5 * multiplier, trace2: 15 * multiplier },
              { name: "Apr", trace0: 17 * multiplier, trace1: 11 * multiplier, trace2: 12 * multiplier },
              { name: "May", trace0: 16 * multiplier, trace1: 9 * multiplier, trace2: 9 * multiplier },
              { name: "Jun", trace0: 19 * multiplier, trace1: 12 * multiplier, trace2: 14 * multiplier },
            ],
            bar: [
              { name: "Jan", primaryProduct: 20 * multiplier, secondaryProduct: 19 * multiplier },
              { name: "Feb", primaryProduct: 24 * multiplier, secondaryProduct: 22 * multiplier },
              { name: "Mar", primaryProduct: 18 * multiplier, secondaryProduct: 17 * multiplier },
              { name: "Apr", primaryProduct: 21 * multiplier, secondaryProduct: 20 * multiplier },
              { name: "May", primaryProduct: 19 * multiplier, secondaryProduct: 18 * multiplier },
              { name: "Jun", primaryProduct: 23 * multiplier, secondaryProduct: 21 * multiplier },
              { name: "Jul", primaryProduct: 25 * multiplier, secondaryProduct: 24 * multiplier },
              { name: "Aug", primaryProduct: 22 * multiplier, secondaryProduct: 21 * multiplier },
            ],
            scatter: Array.from({ length: 30 }, (_, i) => ({
              x: i + Math.random() * 5 * multiplier,
              y: 4 + Math.random() * 1.5 * multiplier,
              z: Math.random() * 100 * multiplier,
            })),
            radar: [
              { subject: "Metric A", trace0: 0.8 * multiplier, trace1: 0.7 * multiplier, trace2: 0.9 * multiplier },
              { subject: "Metric B", trace0: 0.6 * multiplier, trace1: 0.9 * multiplier, trace2: 0.7 * multiplier },
              { subject: "Metric C", trace0: 0.9 * multiplier, trace1: 0.8 * multiplier, trace2: 0.6 * multiplier },
              { subject: "Metric D", trace0: 0.7 * multiplier, trace1: 0.6 * multiplier, trace2: 0.8 * multiplier },
              { subject: "Metric E", trace0: 0.8 * multiplier, trace1: 0.7 * multiplier, trace2: 0.7 * multiplier },
            ]
          }
        };
        
        resolve(mockResponse);
      }, 1000); // Simulate network delay
    });
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred'
    };
  }
};
