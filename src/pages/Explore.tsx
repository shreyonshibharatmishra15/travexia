import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import BookingModal from '@/components/BookingModal';
import { useLocation } from '@/components/LocationContext'; 
import { 
  experiences, 
  filterExperiences, 
  Experience, 
  getAllCities,
  getTrendingExperiences,
  getHiddenGemExperiences,
  getFlashDealExperiences,
  getPersonalizedExperiences,
  getAllLanguages,
  getAllActivityTypes,
  getAllAccessibilityFeatures,
  refreshExperiences
} from '@/lib/data';
import { toast } from 'sonner';

const Explore = () => {
  const { currentLocation } = useLocation();
  const [isLoading, setIsLoading] = useState(false);
  const [personalizedExperiences, setPersonalizedExperiences] = useState<Experience[]>([]);
  
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [timeFrame, setTimeFrame] = useState<'today' | 'next48hours' | 'all'>('all');
  const [selectedCities, setSelectedCities] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [maxPrice, setMaxPrice] = useState<number>(100);
  const [showOnlyTrending, setShowOnlyTrending] = useState(false);
  const [showOnlyHiddenGems, setShowOnlyHiddenGems] = useState(false);
  const [showOnlyFlashDeals, setShowOnlyFlashDeals] = useState(false);
  const [activeTab, setActiveTab] = useState("all");
  const [sortOption, setSortOption] = useState<'price-asc' | 'price-desc' | 'rating-desc' | 'time-asc'>('time-asc');
  
  const [selectedTimeOfDay, setSelectedTimeOfDay] = useState<('morning' | 'afternoon' | 'evening')[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedActivityTypes, setSelectedActivityTypes] = useState<string[]>([]);
  const [selectedAccessibility, setSelectedAccessibility] = useState<{
    mobility: string[];
    communication: string[];
    sensory: string[];
    freeForAssistants: boolean;
  }>({
    mobility: [],
    communication: [],
    sensory: [],
    freeForAssistants: false
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      toast.info("Event listings refreshed", {
        description: "Showing the latest events in your area"
      });
    }, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(interval);
  }, []);
  
  useEffect(() => {
    const fetchExternalExperiences = async () => {
      if (!currentLocation) return;
      
      setIsLoading(true);
      try {
        await refreshExperiences(currentLocation);
        toast.info(`Showing experiences in ${currentLocation}`, {
          description: "Discover local authentic experiences"
        });
        
        setSelectedCities([]);
        setTimeFrame('all');
        setShowOnlyTrending(false);
        setShowOnlyHiddenGems(false);
        setShowOnlyFlashDeals(false);
        
        updatePersonalizedExperiences(selectedInterests, currentLocation);
      } catch (error) {
        console.error("Error fetching experiences:", error);
        toast.error("Failed to load experiences", {
          description: "Please try again later"
        });
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchExternalExperiences();
  }, [currentLocation]);
  
  const updatePersonalizedExperiences = (interests: string[], location: string) => {
    const personalized = getPersonalizedExperiences(interests, location);
    setPersonalizedExperiences(personalized);
  };
  
  const cities = getAllCities();
  const languages = getAllLanguages();
  const activityTypes = getAllActivityTypes();
  const accessibilityFeatures = getAllAccessibilityFeatures();
  
  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowBookingModal(true);
  };
  
  const toggleCity = (city: string) => {
    if (selectedCities.includes(city)) {
      setSelectedCities(selectedCities.filter(c => c !== city));
    } else {
      setSelectedCities([...selectedCities, city]);
    }
  };
  
  const toggleTimeOfDay = (time: 'morning' | 'afternoon' | 'evening') => {
    if (selectedTimeOfDay.includes(time)) {
      setSelectedTimeOfDay(selectedTimeOfDay.filter(t => t !== time));
    } else {
      setSelectedTimeOfDay([...selectedTimeOfDay, time]);
    }
  };
  
  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== language));
    } else {
      setSelectedLanguages([...selectedLanguages, language]);
    }
  };
  
  const toggleActivityType = (type: string) => {
    if (selectedActivityTypes.includes(type)) {
      setSelectedActivityTypes(selectedActivityTypes.filter(t => t !== type));
    } else {
      setSelectedActivityTypes([...selectedActivityTypes, type]);
    }
  };
  
  const toggleAccessibilityFeature = (category: 'mobility' | 'communication' | 'sensory', feature: string) => {
    const currentFeatures = [...selectedAccessibility[category]];
    
    if (currentFeatures.includes(feature)) {
      setSelectedAccessibility({
        ...selectedAccessibility,
        [category]: currentFeatures.filter(f => f !== feature)
      });
    } else {
      setSelectedAccessibility({
        ...selectedAccessibility,
        [category]: [...currentFeatures, feature]
      });
    }
  };
  
  const toggleFreeForAssistants = () => {
    setSelectedAccessibility({
      ...selectedAccessibility,
      freeForAssistants: !selectedAccessibility.freeForAssistants
    });
  };
  
  let filteredExperiences = filterExperiences(
    selectedInterests,
    timeFrame,
    selectedCities,
    showOnlyTrending,
    showOnlyHiddenGems,
    showOnlyFlashDeals,
    maxPrice,
    selectedTimeOfDay.length > 0 ? selectedTimeOfDay : undefined,
    selectedLanguages.length > 0 ? selectedLanguages : undefined,
    selectedActivityTypes.length > 0 ? selectedActivityTypes : undefined,
    (selectedAccessibility.mobility.length > 0 || 
     selectedAccessibility.communication.length > 0 || 
     selectedAccessibility.sensory.length > 0 || 
     selectedAccessibility.freeForAssistants) ? selectedAccessibility : undefined,
    currentLocation
  );
  
  if (searchQuery) {
    const query = searchQuery.toLowerCase();
    filteredExperiences = filteredExperiences.filter(exp => 
      exp.title.toLowerCase().includes(query) ||
      exp.description.toLowerCase().includes(query) ||
      exp.location.toLowerCase().includes(query) ||
      exp.city.toLowerCase().includes(query) ||
      exp.categories.some(cat => cat.toLowerCase().includes(query)) ||
      exp.provider.toLowerCase().includes(query)
    );
  }
  
  filteredExperiences = [...filteredExperiences].sort((a, b) => {
    switch(sortOption) {
      case 'price-asc':
        return a.price - b.price;
      case 'price-desc':
        return b.price - a.price;
      case 'rating-desc':
        return b.rating - a.rating;
      case 'time-asc':
        return new Date(a.startDate).getTime() - new Date(b.startDate).getTime();
      default:
        return 0;
    }
  });
  
  const trendingExperiences = getTrendingExperiences();
  const hiddenGemExperiences = getHiddenGemExperiences();
  const flashDealExperiences = getFlashDealExperiences();
  
  const hasExperiences = experiences.length > 0;
  
  const clearAllFilters = () => {
    setSelectedInterests([]);
    setSelectedCities([]);
    setMaxPrice(100);
    setShowOnlyTrending(false);
    setShowOnlyHiddenGems(false);
    setShowOnlyFlashDeals(false);
    setTimeFrame('all');
    setSelectedTimeOfDay([]);
    setSelectedLanguages([]);
    setSelectedActivityTypes([]);
    setSelectedAccessibility({
      mobility: [],
      communication: [],
      sensory: [],
      freeForAssistants: false
    });
    setSearchQuery('');
  };
  
  const countActiveFilters = () => {
    return selectedInterests.length + 
           selectedCities.length + 
           selectedTimeOfDay.length + 
           selectedLanguages.length + 
           selectedActivityTypes.length + 
           selectedAccessibility.mobility.length + 
           selectedAccessibility.communication.length + 
           selectedAccessibility.sensory.length + 
           (selectedAccessibility.freeForAssistants ? 1 : 0) +
           (timeFrame !== 'all' ? 1 : 0) +
           (showOnlyTrending ? 1 : 0) +
           (showOnlyHiddenGems ? 1 : 0) +
           (showOnlyFlashDeals ? 1 : 0) +
           (maxPrice < 100 ? 1 : 0);
  };
  
  const activeFiltersCount = countActiveFilters();
  
  const handleRefreshExperiences = async () => {
    setIsLoading(true);
    try {
      await refreshExperiences(currentLocation);
      toast.success("Experiences refreshed", {
        description: "Showing the latest events in your area"
      });
      updatePersonalizedExperiences(selectedInterests, currentLocation);
    } catch (error) {
      toast.error("Failed to refresh experiences", {
        description: "Please try again later"
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-20 pb-16">
        <div className="container px-4 md:px-6">
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <button 
                onClick={handleRefreshExperiences}
                disabled={isLoading}
                className="ml-2 p-2 rounded-full bg-primary/10 hover:bg-primary/20 transition-colors"
                title="Refresh experiences"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-primary border-r-transparent rounded-full animate-spin" />
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                    <path d="M21 3v5h-5" />
                    <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                    <path d="M3 21v-5h5" />
                  </svg>
                )}
              </button>
            </div>
            
            <LocationIndicator currentLocation={currentLocation} />
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <FilterToggle 
                showFilters={showFilters} 
                setShowFilters={setShowFilters} 
                activeFiltersCount={activeFiltersCount} 
              />
              
              <SortOptions 
                timeFrame={timeFrame} 
                setTimeFrame={setTimeFrame} 
                setSortOption={setSortOption} 
                sortOption={sortOption} 
              />
            </div>
            
            {showFilters && (
              <FilterPanel 
                selectedInterests={selectedInterests}
                setSelectedInterests={setSelectedInterests}
                cities={cities}
                selectedCities={selectedCities}
                toggleCity={toggleCity}
                maxPrice={maxPrice}
                setMaxPrice={setMaxPrice}
                selectedTimeOfDay={selectedTimeOfDay}
                toggleTimeOfDay={toggleTimeOfDay}
                languages={languages}
                selectedLanguages={selectedLanguages}
                toggleLanguage={toggleLanguage}
                activityTypes={activityTypes}
                selectedActivityTypes={selectedActivityTypes}
                toggleActivityType={toggleActivityType}
                accessibilityFeatures={accessibilityFeatures}
                selectedAccessibility={selectedAccessibility}
                toggleAccessibilityFeature={toggleAccessibilityFeature}
                toggleFreeForAssistants={toggleFreeForAssistants}
                showOnlyTrending={showOnlyTrending}
                setShowOnlyTrending={setShowOnlyTrending}
                showOnlyHiddenGems={showOnlyHiddenGems}
                setShowOnlyHiddenGems={setShowOnlyHiddenGems}
                showOnlyFlashDeals={showOnlyFlashDeals}
                setShowOnlyFlashDeals={setShowOnlyFlashDeals}
                clearAllFilters={clearAllFilters}
                activeFiltersCount={activeFiltersCount}
              />
            )}
          </div>
          
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12">
              <div className="h-12 w-12 border-4 border-primary border-r-transparent rounded-full animate-spin mb-4" />
              <p className="text-lg text-muted-foreground">Loading experiences from Viator, GetYourGuide, and Fever...</p>
            </div>
          ) : hasExperiences ? (
            <TabsWrapper 
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              filteredExperiences={filteredExperiences}
              personalizedExperiences={personalizedExperiences}
              trendingExperiences={trendingExperiences}
              hiddenGemExperiences={hiddenGemExperiences}
              flashDealExperiences={flashDealExperiences}
              currentLocation={currentLocation}
              timeFrame={timeFrame}
              handleExperienceClick={handleExperienceClick}
              selectedInterests={selectedInterests}
              setSelectedInterests={setSelectedInterests}
              updatePersonalizedExperiences={updatePersonalizedExperiences}
              clearAllFilters={clearAllFilters}
            />
          ) : (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold mb-2">No experiences found</h2>
              <p className="text-muted-foreground mb-6">Try changing your filters or location</p>
              <button 
                onClick={handleRefreshExperiences}
                className="bg-primary text-primary-foreground px-4 py-2 rounded hover:bg-primary/90 transition-colors"
              >
                Refresh Experiences
              </button>
            </div>
          )}
        </div>
      </main>
      
      <BookingModal
        experience={selectedExperience}
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
};

export default Explore;
