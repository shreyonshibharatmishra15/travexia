
export type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  city: "Kitchener" | "Waterloo" | "Cambridge" | "Guelph";
  rating: number;
  reviewCount: number;
  categories: string[];
  provider: string;
  availableTimes: string[];
  startDate: string; // ISO date string
  endDate: string;   // ISO date string
  trending?: boolean;
  hiddenGem?: boolean;
  flashDeal?: boolean;
  flashDealEndTime?: string;
  discountPercentage?: number;
  soldOut?: boolean;
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

// Helper function to create ISO date strings for the next N hours
const getISODateInHours = (hoursFromNow: number): string => {
  const date = new Date();
  date.setHours(date.getHours() + hoursFromNow);
  return date.toISOString();
};

// Create experiences with realistic dates within the next 48 hours
export const experiences: Experience[] = [
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
    trending: true
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
    discountPercentage: 15
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
    hiddenGem: true
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
    trending: true
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
    soldOut: true
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
    hiddenGem: true
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
    trending: true
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
    discountPercentage: 20
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
    hiddenGem: true
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
    trending: true
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
    discountPercentage: 10
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
    hiddenGem: true
  },
];

// Determine if an experience is available today
const isAvailableToday = (exp: Experience): boolean => {
  const start = new Date(exp.startDate);
  const now = new Date();
  const todayStart = new Date(now.setHours(0, 0, 0, 0));
  const todayEnd = new Date(now.setHours(23, 59, 59, 999));
  
  return start >= todayStart && start <= todayEnd;
};

// Determine if an experience is available within the next 48 hours
const isAvailableWithin48Hours = (exp: Experience): boolean => {
  const start = new Date(exp.startDate);
  const now = new Date();
  const future48Hours = new Date(now.getTime() + 48 * 60 * 60 * 1000);
  
  return start >= now && start <= future48Hours;
};

// Enhanced filtering function that supports multiple filters
export function filterExperiences(
  selectedInterests: string[] = [],
  timeFrame: 'today' | 'next48hours' | 'all' = 'all',
  cities: string[] = [],
  onlyTrending: boolean = false,
  onlyHiddenGems: boolean = false,
  onlyFlashDeals: boolean = false,
  maxPrice?: number
): Experience[] {
  return experiences.filter(exp => {
    // Filter by interests
    const matchesInterests = selectedInterests.length === 0 || 
      exp.categories.some(category => selectedInterests.includes(category));
    
    // Filter by time frame
    const matchesTimeFrame = 
      timeFrame === 'all' ||
      (timeFrame === 'today' && isAvailableToday(exp)) ||
      (timeFrame === 'next48hours' && isAvailableWithin48Hours(exp));
    
    // Filter by cities
    const matchesCities = cities.length === 0 || 
      cities.includes(exp.city);
    
    // Filter by special categories
    const matchesTrending = !onlyTrending || exp.trending;
    const matchesHiddenGems = !onlyHiddenGems || exp.hiddenGem;
    const matchesFlashDeals = !onlyFlashDeals || exp.flashDeal;
    
    // Filter by price
    const matchesPrice = !maxPrice || exp.price <= maxPrice;
    
    return matchesInterests && 
           matchesTimeFrame && 
           matchesCities && 
           matchesTrending && 
           matchesHiddenGems && 
           matchesFlashDeals && 
           matchesPrice;
  });
}

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find(exp => exp.id === id);
}

// Get trending experiences
export function getTrendingExperiences(): Experience[] {
  return experiences.filter(exp => exp.trending && isAvailableWithin48Hours(exp));
}

// Get hidden gems
export function getHiddenGemExperiences(): Experience[] {
  return experiences.filter(exp => exp.hiddenGem && isAvailableWithin48Hours(exp));
}

// Get flash deals
export function getFlashDealExperiences(): Experience[] {
  const now = new Date();
  return experiences.filter(exp => {
    if (!exp.flashDeal || !exp.flashDealEndTime) return false;
    const dealEnd = new Date(exp.flashDealEndTime);
    return dealEnd > now && isAvailableWithin48Hours(exp);
  });
}

// Get all available cities
export function getAllCities(): string[] {
  return Array.from(new Set(experiences.map(exp => exp.city)));
}

// Calculate discounted price if applicable
export function getDisplayPrice(experience: Experience): number {
  if (experience.flashDeal && experience.discountPercentage) {
    const discount = experience.price * (experience.discountPercentage / 100);
    return experience.price - discount;
  }
  return experience.price;
}
