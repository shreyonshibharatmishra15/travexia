
export interface FeverExperience {
  id: string;
  name: string;
  description: string;
  media: {
    images: string[];
  };
  price: {
    value: number;
    currency: string;
  };
  duration: {
    value: number;
    unit: string;
  };
  venue: {
    name: string;
    city: string;
    region?: string;
    country?: string;
    location?: {
      latitude: number;
      longitude: number;
    };
  };
  reviews: {
    average: number;
    count: number;
  };
  tags: string[];
  organizer: string;
  sessions: {
    startTime: string;
    endTime: string;
  }[];
  trending?: boolean;
  highlighted?: boolean;
  flash?: {
    discount: number;
    endsAt: string;
  };
  soldOut?: boolean;
  languages?: string[];
}

// This is a mock implementation - in a real application, you would 
// implement actual API calls using fetch or axios
export async function fetchFeverExperiences(location: string): Promise<FeverExperience[]> {
  console.log(`Fetching Fever experiences for location: ${location}`);
  
  // In a real implementation, this would be an actual API call
  // For now, we're just logging to demonstrate the flow
  return new Promise((resolve) => {
    // Simulate API response time
    setTimeout(() => {
      console.log('Mock Fever API response received');
      resolve([]);
    }, 500);
  });
}
