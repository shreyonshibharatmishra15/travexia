<lov-code>
export type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  city: string;
  region?: string;
  country?: string;
  coordinates?: { lat: number; lng: number };
  rating: number;
  reviewCount: number;
  categories: string[];
  provider: string;
  availableTimes: string[];
  startDate: string;
  endDate: string;
  trending?: boolean;
  hiddenGem?: boolean;
  flashDeal?: boolean;
  flashDealEndTime?: string;
  discountPercentage?: number;
  soldOut?: boolean;
  languages?: string[];
  activityType?: string[];
  accessibilityFeatures?: {
    mobility?: string[];
    communication?: string[];
    sensory?: string[];
    freeForAssistants?: boolean;
  };
  aiRecommendationScore?: number;
  source?: 'local' | 'viator' | 'getyourguide' | 'fever';
};

export type Interest = {
  id: string;
  name: string;
  icon: string;
};

export const interests: Interest[] = [
  { id: '1', name: 'Food & Drink', icon: 'utensils' },
  { id: '2', name: 'Music & Nightlife', icon: 'music' },
  { id: '3', name: 'Festivals & Culture', icon: 'palette' },
  { id: '4', name: 'Adventure & Outdoor', icon: 'tree' },
  { id: '5', name: 'Wellness', icon: 'spa' },
  { id: '6', name: 'Workshops & Community', icon: 'users' },
  { id: '7', name: 'Sports', icon: 'baseball' },
  { id: '8', name: 'Family-Friendly', icon: 'child' },
  { id: '9', name: 'Tours', icon: 'map' },
  { id: '10', name: 'Local Culture', icon: 'landmark' },
];

const getISODateInHours = (hoursFromNow: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date.toISOString();
};

export const experiencesData: Experience[] = [
  {
    id: '1',
    title: 'Waterloo Farmers\' Market Food Tour',
    description: 'Explore the vibrant Waterloo Market with a local foodie guide. Sample the best regional specialties and meet local producers.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    price: 45,
    duration: '2 hours',
    location: 'St. Jacobs Farmers\' Market',
    city: 'Waterloo',
    rating: 4.8,
    reviewCount: 124,
    categories: ['Food & Drink', 'Tours', 'Local Culture'],
    provider: 'KW Local Tours',
    availableTimes: ['10:00 AM', '1:00 PM', '4:00 PM'],
    startDate: getISODateInHours(2),
    endDate: getISODateInHours(4),
    trending: true,
    languages: ['English', 'French'],
    activityType: ['Food and drink', 'Tours', 'Sightseeing'],
    accessibilityFeatures: {
      mobility: ['No stairs or steps', 'Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '2',
    title: 'Craft Beer Tasting Experience',
    description: 'Visit three of Kitchener\'s most innovative craft breweries. Learn about the brewing process and enjoy generous samples.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    price: 65,
    duration: '3 hours',
    location: 'Downtown Kitchener',
    city: 'Kitchener',
    rating: 4.9,
    reviewCount: 86,
    categories: ['Food & Drink', 'Music & Nightlife'],
    provider: 'Brew Tours KW',
    availableTimes: ['2:00 PM', '6:00 PM'],
    startDate: getISODateInHours(6),
    endDate: getISODateInHours(9),
    flashDeal: true,
    flashDealEndTime: getISODateInHours(3),
    discountPercentage: 15,
    languages: ['English'],
    activityType: ['Food and drink', 'Entertainment'],
    accessibilityFeatures: {
      mobility: ['Accessible parking spot'],
      freeForAssistants: true
    }
  },
  {
    id: '3',
    title: 'Pottery Workshop with Local Artist',
    description: 'Create your own ceramic masterpiece under the guidance of a professional potter. All materials provided.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    price: 85,
    duration: '2.5 hours',
    location: 'Clay & Glass Gallery',
    city: 'Waterloo',
    rating: 4.7,
    reviewCount: 53,
    categories: ['Festivals & Culture', 'Workshops & Community'],
    provider: 'Waterloo Arts Collective',
    availableTimes: ['11:00 AM', '3:00 PM'],
    startDate: getISODateInHours(24),
    endDate: getISODateInHours(26.5),
    hiddenGem: true,
    languages: ['English'],
    activityType: ['Art and crafts', 'Workshops'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '4',
    title: 'Grand River Kayaking Adventure',
    description: 'Paddle down the scenic Grand River with experienced guides. Perfect for beginners and intermediate kayakers.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    price: 75,
    duration: '3 hours',
    location: 'Cambridge Riverside Park',
    city: 'Cambridge',
    rating: 4.9,
    reviewCount: 108,
    categories: ['Adventure & Outdoor', 'Sports'],
    provider: 'Grand River Experiences',
    availableTimes: ['9:00 AM', '1:00 PM'],
    startDate: getISODateInHours(5),
    endDate: getISODateInHours(8),
    trending: true,
    languages: ['English'],
    activityType: ['Water activities', 'Outdoor'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '5',
    title: 'Live Jazz at The Jazz Room',
    description: 'Enjoy a night of world-class jazz music at Waterloo\'s premier jazz venue, featuring both local and international artists.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 30,
    duration: '2.5 hours',
    location: 'The Jazz Room',
    city: 'Waterloo',
    rating: 4.6,
    reviewCount: 97,
    categories: ['Music & Nightlife', 'Festivals & Culture'],
    provider: 'KW Jazz Festival',
    availableTimes: ['8:00 PM', '10:30 PM'],
    startDate: getISODateInHours(10),
    endDate: getISODateInHours(12.5),
    soldOut: true,
    languages: ['English'],
    activityType: ['Music', 'Entertainment'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '6',
    title: 'Forest Bathing & Meditation',
    description: 'Experience the Japanese practice of shinrin-yoku (forest bathing) guided by a certified forest therapy guide.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    price: 40,
    duration: '2 hours',
    location: 'Huron Natural Area',
    city: 'Kitchener',
    rating: 4.8,
    reviewCount: 45,
    categories: ['Adventure & Outdoor', 'Wellness'],
    provider: 'Mindful KW',
    availableTimes: ['8:00 AM', '4:00 PM'],
    startDate: getISODateInHours(27),
    endDate: getISODateInHours(29),
    hiddenGem: true,
    languages: ['English', 'Japanese'],
    activityType: ['Wellness', 'Nature and outdoors'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      sensory: ['Quiet retreat space available'],
      freeForAssistants: true
    }
  },
  {
    id: '7',
    title: 'Historical Walking Tour of Downtown Guelph',
    description: 'Discover the fascinating history of Guelph\'s downtown core and the surrounding heritage district.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 25,
    duration: '1.5 hours',
    location: 'Downtown Guelph',
    city: 'Guelph',
    rating: 4.5,
    reviewCount: 62,
    categories: ['Tours', 'Local Culture', 'Festivals & Culture'],
    provider: 'Guelph Heritage Society',
    availableTimes: ['10:00 AM', '2:00 PM', '5:00 PM'],
    startDate: getISODateInHours(3),
    endDate: getISODateInHours(4.5),
    trending: true,
    languages: ['English'],
    activityType: ['Tours', 'History'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '8',
    title: 'Salsa Dance Class for Beginners',
    description: 'Learn the fundamentals of salsa dancing in this fun, high-energy class suitable for complete beginners.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    price: 20,
    duration: '1 hour',
    location: 'KW Latin Dance Studio',
    city: 'Waterloo',
    rating: 4.9,
    reviewCount: 79,
    categories: ['Music & Nightlife', 'Workshops & Community'],
    provider: 'Salsa KW',
    availableTimes: ['6:00 PM', '8:00 PM'],
    startDate: getISODateInHours(8),
    endDate: getISODateInHours(9),
    flashDeal: true,
    flashDealEndTime: getISODateInHours(4),
    discountPercentage: 20,
    languages: ['English'],
    activityType: ['Dance', 'Workshops'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '9',
    title: 'Cambridge Butterfly Conservatory Tour',
    description: 'Explore the magical world of butterflies with a guided tour through this tropical paradise.',
    image: 'https://images.unsplash.com/photo-1555320138-087de9e27314',
    price: 35,
    duration: '1.5 hours',
    location: 'Cambridge Butterfly Conservatory',
    city: 'Cambridge',
    rating: 4.7,
    reviewCount: 112,
    categories: ['Adventure & Outdoor', 'Family-Friendly'],
    provider: 'Cambridge Nature Tours',
    availableTimes: ['11:00 AM', '2:00 PM', '4:00 PM'],
    startDate: getISODateInHours(25),
    endDate: getISODateInHours(26.5),
    hiddenGem: true,
    languages: ['English'],
    activityType: ['Nature and outdoors', 'Family-friendly'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '10',
    title: 'Guelph Craft Distillery Tasting',
    description: 'Sample premium craft spirits at this award-winning distillery, with a behind-the-scenes tour of the production process.',
    image: 'https://images.unsplash.com/photo-1550985543-1d83b30e5ed9',
    price: 50,
    duration: '2 hours',
    location: 'Dixon\'s Distilled Spirits',
    city: 'Guelph',
    rating: 4.8,
    reviewCount: 67,
    categories: ['Food & Drink', 'Tours'],
    provider: 'Guelph Spirit Tours',
    availableTimes: ['3:00 PM', '7:00 PM'],
    startDate: getISODateInHours(6),
    endDate: getISODateInHours(8),
    trending: true,
    languages: ['English'],
    activityType: ['Food and drink', 'Tours'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '11',
    title: 'Kitchener Street Food Night Market',
    description: 'Experience the best street food vendors from across the region at this vibrant night market.',
    image: 'https://images.unsplash.com/photo-1533900298318-6b8da08a523e',
    price: 15,
    duration: '3 hours',
    location: 'Victoria Park',
    city: 'Kitchener',
    rating: 4.9,
    reviewCount: 192,
    categories: ['Food & Drink', 'Festivals & Culture', 'Music & Nightlife'],
    provider: 'KW Foodie Events',
    availableTimes: ['6:00 PM', '7:00 PM', '8:00 PM'],
    startDate: getISODateInHours(30),
    endDate: getISODateInHours(33),
    trending: true,
    flashDeal: true,
    flashDealEndTime: getISODateInHours(20),
    discountPercentage: 10,
    languages: ['English'],
    activityType: ['Food and drink', 'Entertainment', 'Nightlife'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '12',
    title: 'Waterloo Region Tech Hub Tour',
    description: 'Go behind the scenes at some of the region\'s most innovative tech companies and startups.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    price: 40,
    duration: '2.5 hours',
    location: 'Various Locations',
    city: 'Waterloo',
    rating: 4.5,
    reviewCount: 48,
    categories: ['Tours', 'Workshops & Community'],
    provider: 'Waterloo Tech Tours',
    availableTimes: ['10:00 AM', '2:00 PM'],
    startDate: getISODateInHours(48),
    endDate: getISODateInHours(50.5),
    hiddenGem: true,
    languages: ['English'],
    activityType: ['Tours', 'Workshops'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      sensory: ['No extreme sensory stimuli'],
      freeForAssistants: true
    }
  },
  {
    id: '101',
    title: 'CN Tower Edge Walk',
    description: 'Experience the thrill of walking on the edge of one of the world\'s tallest buildings with breathtaking views of Toronto.',
    image: 'https://images.unsplash.com/photo-1503899036084-c55cdd92da26',
    price: 195,
    duration: '1.5 hours',
    location: 'CN Tower',
    city: 'Toronto',
    region: 'Ontario',
    country: 'Canada',
    coordinates: { lat: 43.6426, lng: -79.3871 },
    rating: 4.8,
    reviewCount: 342,
    categories: ['Adventure & Outdoor', 'Tours'],
    provider: 'CN Tower Experiences',
    availableTimes: ['9:00 AM', '11:00 AM', '1:00 PM', '3:00 PM'],
    startDate: getISODateInHours(24),
    endDate: getISODateInHours(25.5),
    trending: true,
    languages: ['English', 'French'],
    activityType: ['Adventure', 'Tours', 'Sightseeing'],
    accessibilityFeatures: {
      communication: ['Detailed audio or verbal information'],
      freeForAssistants: true
    },
    aiRecommendationScore: 0.95
  },
  {
    id: '102',
    title: 'Stanley Park Bike Tour',
    description: 'Explore Vancouver\'s magnificent Stanley Park on this guided bicycle tour, seeing landmarks and hidden gems.',
    image: 'https://images.unsplash.com/photo-1509809741902-9a1f18d9dde1',
    price: 45,
    duration: '3 hours',
    location: 'Stanley Park',
    city: 'Vancouver',
    region: 'British Columbia',
    country: 'Canada',
    coordinates: { lat: 49.3017, lng: -123.1417 },
    rating: 4.9,
    reviewCount: 218,
    categories: ['Adventure & Outdoor', 'Sports', 'Tours'],
    provider: 'Vancouver Bike Tours',
    availableTimes: ['10:00 AM', '2:00 PM'],
    startDate: getISODateInHours(26),
    endDate: getISODateInHours(29),
    hiddenGem: true,
    languages: ['English'],
    activityType: ['Sports', 'Nature and outdoors', 'Tours'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      freeForAssistants: true
    },
    aiRecommendationScore: 0.88
  },
  {
    id: '103',
    title: 'Times Square Walking Tour',
    description: 'Discover the bright lights and fascinating history of New York\'s Times Square on this guided walking tour.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856',
    price: 35,
    duration: '2 hours',
    location: 'Times Square',
    city: 'New York',
    region: 'New York',
    country: 'United States',
    coordinates: { lat: 40.7580, lng: -73.9855 },
    rating: 4.7,
    reviewCount: 532,
    categories: ['Tours', 'Local Culture', 'Festivals & Culture'],
    provider: 'NYC Walking Tours',
    availableTimes: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM'],
    startDate: getISODateInHours(48),
    endDate: getISODateInHours(50),
    trending: true,
    languages: ['English', 'Spanish'],
    activityType: ['Tours', 'History', 'Sightseeing'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      freeForAssistants: true
    },
    aiRecommendationScore: 0.82
  },
  {
    id: '104',
    title: 'Tokyo Sushi Making Class',
    description: 'Learn to make authentic sushi with a professional chef in this hands-on culinary experience.',
    image: 'https://images.unsplash.com/photo-1553621042-f6e147245754',
    price: 80,
    duration: '2.5 hours',
    location: 'Tsukiji Outer Market',
    city: 'Tokyo',
    country: 'Japan',
    coordinates: { lat: 35.6652, lng: 139.7698 },
    rating: 4.9,
    reviewCount: 176,
    categories: ['Food & Drink', 'Workshops & Community'],
    provider: 'Tokyo Culinary Academy',
    availableTimes: ['11:00 AM', '2:00 PM', '5:00 PM'],
    startDate: getISODateInHours(72),
    endDate: getISODateInHours(74.5),
    hiddenGem: true,
    languages: ['English', 'Japanese'],
    activityType: ['Food and drink', 'Workshops', 'Art and culture'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      freeForAssistants: true
    },
    aiRecommendationScore: 0.93
  },
  {
    id: '105',
    title: 'Paris Night Photography Tour',
    description: 'Capture the magic of Paris at night, including the Eiffel Tower light show, on this guided photography tour.',
    image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34',
    price: 65,
    duration: '3 hours',
    location: 'Trocadero',
    city: 'Paris',
    country: 'France',
    coordinates: { lat: 48.8584, lng: 2.2945 },
    rating: 4.8,
    reviewCount: 248,
    categories: ['Tours', 'Festivals & Culture', 'Workshops & Community'],
    provider: 'Paris Photo Tours',
    availableTimes: ['7:00 PM', '8:00 PM'],
    startDate: getISODateInHours(48),
    endDate: getISODateInHours(51),
    flashDeal: true,
    flashDealEndTime: getISODateInHours(24),
    discountPercentage: 15,
    languages: ['English', 'French'],
    activityType: ['Art and culture', 'Tours', 'Workshops'],
    accessibilityFeatures: {
      mobility: ['Mainly flat or levelled ground'],
      communication: ['Detailed audio or verbal information'],
      freeForAssistants: true
    },
    aiRecommendationScore: 0.89
  }
];

const isAvailableToday = (exp: Experience): boolean => {
  const start = new Date(exp.startDate);
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));
  
  return start >= todayStart && start <= todayEnd;
};

const isAvailableWithin48Hours = (exp: Experience): boolean => {
  const start = new Date(exp.startDate);
  const now = new Date();
  const future48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  
  return start >= now && start <= future48Hours;
};

export function filterExperiences(
  selectedInterests: string[] = [],
  timeFrame: 'today' | 'next48hours' | 'all' = 'all',
  cities: string[] = [],
  onlyTrending: boolean = false,
  onlyHiddenGems: boolean = false,
  onlyFlashDeals: boolean = false,
  maxPrice?: number,
  timeOfDay?: ('morning' | 'afternoon' | 'evening')[],
  languages?: string[],
  activityTypes?: string[],
  accessibilityFeatures?: {
    mobility?: string[],
    communication?: string[],
    sensory?: string[],
    freeForAssistants?: boolean
  },
  location?: string
): Experience[] {
  return combinedExperiences.filter(exp => {
    const matchesInterests = selectedInterests.length === 0 || 
      exp.categories.some(category => selectedInterests.includes(category));
    
    const matchesTimeFrame = 
      timeFrame === 'all' ||
      (timeFrame === 'today' && isAvailableToday(exp)) ||
      (timeFrame === 'next48hours' && isAvailableWithin48Hours(exp));
    
    let matchesCities = true;
    if (cities.length > 0) {
      matchesCities = cities.includes(exp.city);
    } else if (location) {
      matchesCities = exp.city === location;
    }
    
    const matchesTrending = !onlyTrending || exp.trending;
    const matchesHiddenGems = !onlyHiddenGems || exp.hiddenGem;
    const matchesFlashDeals = !onlyFlashDeals || exp.flashDeal;
    
    const matchesPrice = !maxPrice || exp.price <= maxPrice;
    
    let matchesTimeOfDay = true;
    if (timeOfDay && timeOfDay.length > 0) {
      const expStartDate = new Date(exp.startDate);
      const expTimeOfDay = getTimeOfDay(expStartDate);
      matchesTimeOfDay = timeOfDay.includes(expTimeOfDay);
    }
    
    let matchesLanguages = true;
    if (languages && languages.length > 0 && exp.languages) {
      matchesLanguages = languages.some(lang => exp.languages?.includes(lang));
    }
    
    let matchesActivityTypes = true;
    if (activityTypes && activityTypes.length > 0 && exp.activityType) {
      matchesActivityTypes = activityTypes.some(type => exp.activityType?.includes(type));
    }
    
    let matchesAccessibility = true;
    if (accessibilityFeatures) {
      if (accessibilityFeatures.mobility && accessibilityFeatures.mobility.length > 0) {
        matchesAccessibility = matchesAccessibility && accessibilityFeatures.mobility.some(
          feature => exp.accessibilityFeatures?.mobility?.includes(feature)
        );
      }
      
      if (accessibilityFeatures.communication && accessibilityFeatures.communication.length > 0) {
        matchesAccessibility = matchesAccessibility && accessibilityFeatures.communication.some(
          feature => exp.accessibilityFeatures?.communication?.includes(feature)
        );
      }
      
      if (accessibilityFeatures.sensory && accessibilityFeatures.sensory.length > 0) {
        matchesAccessibility = matchesAccessibility && accessibilityFeatures.sensory.some(
          feature => exp.accessibilityFeatures?.sensory?.includes(feature)
        );
      }
      
      if (accessibilityFeatures.freeForAssistants) {
        matchesAccessibility = matchesAccessibility && exp.accessibilityFeatures?.freeForAssistants === true;
      }
    }
    
    return matchesInterests && 
           matchesTimeFrame && 
           matchesCities && 
           matchesTrending && 
           matchesHiddenGems && 
           matchesFlashDeals && 
           matchesPrice &&
           matchesTimeOfDay &&
           matchesLanguages &&
           matchesActivityTypes &&
           matchesAccessibility;
  });
}

export function getExperienceById(id: string): Experience | undefined {
  return combinedExperiences.find(exp => exp.id === id);
}

export function getTrendingExperiences(): Experience[] {
  return combinedExperiences.filter(exp => exp.trending && isAvailableWithin48Hours(exp));
}

export function getHiddenGemExperiences(): Experience[] {
  return combinedExperiences.filter(exp => exp.hiddenGem && isAvailableWithin48Hours(exp));
}

export function getFlashDealExperiences(): Experience[] {
  const now = new Date();
  return combinedExperiences.filter(exp => {
    if (!exp.flashDeal || !exp.flashDealEndTime) return false;
    const dealEnd = new Date(exp.flashDealEndTime);
    return dealEnd > now && isAvailableWithin48Hours(exp);
  });
}

export function getAllCities(): string[] {
  return Array.from(new Set(combinedExperiences.map(exp => exp.city)));
}

export function getDisplayPrice(experience: Experience): number {
  if (experience.flashDeal && experience.discountPercentage) {
    const discount = experience.price * (experience.discountPercentage / 100);
    return experience.price - discount;
  }
  return experience.price;
}

export function getTimeOfDay(date: Date): 'morning' | 'afternoon' | 'evening' {
  const hours = date.getHours();
  if (hours < 12) return 'morning';
  if (hours < 17) return 'afternoon';
  return 'evening';
}

export function getAllLanguages(): string[] {
  const allLanguages = new Set<string>();
  combinedExperiences.forEach(exp => {
    if (exp.languages) {
      exp.languages.forEach(lang => allLanguages.add(lang));
    }
  });
  return Array.from(allLanguages);
}

export function getAllActivityTypes(): string[] {
  const allTypes = new Set<string>();
  combinedExperiences.forEach(exp => {
    if (exp.activityType) {
      exp.activityType.forEach(type => allTypes.add(type));
    }
  });
  return Array.from(allTypes);
}

export function getAllAccessibilityFeatures(): {
  mobility: string[];
  communication: string[];
  sensory: string[];
} {
  const mobility = new Set<string>();
  const communication = new Set<string>();
  const sensory = new Set<string>();
  
  combinedExperiences.forEach(exp => {
    if (exp.accessibilityFeatures) {
      if (exp.accessibilityFeatures.mobility) {
        exp.accessibilityFeatures.mobility.forEach(feature => mobility.add(feature));
      }
      if (exp.accessibilityFeatures.communication) {
        exp.accessibilityFeatures.communication.forEach(feature => communication.add(feature));
      }
      if (exp.accessibilityFeatures.sensory) {
        exp.accessibilityFeatures.sensory.forEach(feature => sensory.add(feature));
      }
    }
  });
  
  return {
    mobility: Array.from(mobility),
    communication: Array.from(communication),
    sensory: Array.from(sensory)
  };
}

export function getPersonalizedExperiences(userInterests: string[], location: string): Experience[] {
  return combinedExperiences
    .filter(exp => {
      const matchesLocation = !location || 
                             exp.city === location;
      
      const matchesInterests = userInterests.length === 0 || 
        exp.categories.some(category => userInterests.includes(category));
      
      return matchesLocation && matchesInterests;
    })
    .sort((a, b) => {
      const scoreA = a.aiRecommendationScore || 0.5;
      const scoreB = b.aiRecommendationScore || 0.5;
      return scoreB - scoreA;
    })
    .slice(0, 10);
}

export function getAllRegions(): string[] {
  const regions = new Set<string>();
  combinedExperiences.forEach(exp => {
    if (exp.region) {
      regions.add(exp.region);
    }
  });
  return Array.from(regions);
}

export function getAllCountries(): string[] {
  const countries = new Set<string>();
  combinedExperiences.forEach(exp => {
    if (exp.country) {
      countries.add(exp.country);
    }
  });
  return Array.from(countries);
}

export function getCitiesByRegionOrCountry(region?: string, country?: string): string[] {
  return Array.from(
    new Set(
      combinedExperiences
        .filter(exp => 
          (!region || exp.region === region) && 
          (!country || exp.country === country)
        )
        .map(exp => exp.city)
    )
  );
}

// Mark existing experiences as local source
const localExperiences: Experience[] = experiencesData.map(exp => ({
  ...exp,
  source: 'local' as const
}));

// Create a state variable to store combined experiences
let combinedExperiences: Experience[] = [...localExperiences];
