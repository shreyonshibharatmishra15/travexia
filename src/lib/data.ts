
export type Experience = {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  location: string;
  rating: number;
  reviewCount: number;
  categories: string[];
  provider: string;
  availableTimes: string[];
  availableToday: boolean;
};

export type Interest = {
  id: string;
  name: string;
  icon: string;
};

export const interests: Interest[] = [
  { id: '1', name: 'Food & Drink', icon: 'utensils' },
  { id: '2', name: 'Music', icon: 'music' },
  { id: '3', name: 'Art & Culture', icon: 'palette' },
  { id: '4', name: 'Nature', icon: 'tree' },
  { id: '5', name: 'Wellness', icon: 'spa' },
  { id: '6', name: 'Nightlife', icon: 'moon' },
  { id: '7', name: 'Sports', icon: 'baseball' },
  { id: '8', name: 'Workshops', icon: 'hammer' },
  { id: '9', name: 'Tours', icon: 'map' },
  { id: '10', name: 'Local Culture', icon: 'landmark' },
];

export const experiences: Experience[] = [
  {
    id: '1',
    title: 'Waterloo Farmers\' Market Food Tour',
    description: 'Explore the vibrant Waterloo Market with a local foodie guide. Sample the best regional specialties and meet local producers.',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c',
    price: 45,
    duration: '2 hours',
    location: 'St. Jacobs Farmers\' Market, Waterloo',
    rating: 4.8,
    reviewCount: 124,
    categories: ['Food & Drink', 'Tours', 'Local Culture'],
    provider: 'KW Local Tours',
    availableTimes: ['10:00 AM', '1:00 PM', '4:00 PM'],
    availableToday: true
  },
  {
    id: '2',
    title: 'Craft Beer Tasting Experience',
    description: 'Visit three of Kitchener\'s most innovative craft breweries. Learn about the brewing process and enjoy generous samples.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    price: 65,
    duration: '3 hours',
    location: 'Downtown Kitchener',
    rating: 4.9,
    reviewCount: 86,
    categories: ['Food & Drink', 'Nightlife'],
    provider: 'Brew Tours KW',
    availableTimes: ['2:00 PM', '6:00 PM'],
    availableToday: true
  },
  {
    id: '3',
    title: 'Pottery Workshop with Local Artist',
    description: 'Create your own ceramic masterpiece under the guidance of a professional potter. All materials provided.',
    image: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
    price: 85,
    duration: '2.5 hours',
    location: 'Clay & Glass Gallery, Waterloo',
    rating: 4.7,
    reviewCount: 53,
    categories: ['Art & Culture', 'Workshops'],
    provider: 'Waterloo Arts Collective',
    availableTimes: ['11:00 AM', '3:00 PM'],
    availableToday: false
  },
  {
    id: '4',
    title: 'Grand River Kayaking Adventure',
    description: 'Paddle down the scenic Grand River with experienced guides. Perfect for beginners and intermediate kayakers.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    price: 75,
    duration: '3 hours',
    location: 'Kitchener Waterloo Canoe Club',
    rating: 4.9,
    reviewCount: 108,
    categories: ['Nature', 'Sports'],
    provider: 'Grand River Experiences',
    availableTimes: ['9:00 AM', '1:00 PM'],
    availableToday: true
  },
  {
    id: '5',
    title: 'Live Jazz at The Jazz Room',
    description: 'Enjoy a night of world-class jazz music at Waterloo\'s premier jazz venue, featuring both local and international artists.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 30,
    duration: '2.5 hours',
    location: 'The Jazz Room, Waterloo',
    rating: 4.6,
    reviewCount: 97,
    categories: ['Music', 'Nightlife'],
    provider: 'KW Jazz Festival',
    availableTimes: ['8:00 PM', '10:30 PM'],
    availableToday: false
  },
  {
    id: '6',
    title: 'Forest Bathing & Meditation',
    description: 'Experience the Japanese practice of shinrin-yoku (forest bathing) guided by a certified forest therapy guide.',
    image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05',
    price: 40,
    duration: '2 hours',
    location: 'Huron Natural Area, Kitchener',
    rating: 4.8,
    reviewCount: 45,
    categories: ['Nature', 'Wellness'],
    provider: 'Mindful KW',
    availableTimes: ['8:00 AM', '4:00 PM'],
    availableToday: true
  },
  {
    id: '7',
    title: 'Historical Walking Tour of Victoria Park',
    description: 'Discover the fascinating history of Kitchener\'s oldest park and the surrounding heritage district.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
    price: 25,
    duration: '1.5 hours',
    location: 'Victoria Park, Kitchener',
    rating: 4.5,
    reviewCount: 62,
    categories: ['Tours', 'Local Culture'],
    provider: 'KW Heritage Society',
    availableTimes: ['10:00 AM', '2:00 PM', '5:00 PM'],
    availableToday: true
  },
  {
    id: '8',
    title: 'Salsa Dance Class for Beginners',
    description: 'Learn the fundamentals of salsa dancing in this fun, high-energy class suitable for complete beginners.',
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81',
    price: 20,
    duration: '1 hour',
    location: 'KW Latin Dance Studio, Waterloo',
    rating: 4.9,
    reviewCount: 79,
    categories: ['Music', 'Workshops'],
    provider: 'Salsa KW',
    availableTimes: ['6:00 PM', '8:00 PM'],
    availableToday: false
  },
];

export function filterExperiences(selectedInterests: string[], immediateOnly: boolean = false): Experience[] {
  if (selectedInterests.length === 0) {
    return immediateOnly 
      ? experiences.filter(exp => exp.availableToday)
      : experiences;
  }
  
  return experiences.filter(experience => {
    const matchesInterests = experience.categories.some(category => 
      selectedInterests.includes(category)
    );
    
    if (immediateOnly) {
      return matchesInterests && experience.availableToday;
    }
    
    return matchesInterests;
  });
}

export function getExperienceById(id: string): Experience | undefined {
  return experiences.find(exp => exp.id === id);
}
