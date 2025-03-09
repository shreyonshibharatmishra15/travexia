
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import BookingModal from '@/components/BookingModal';
import InterestSelection from '@/components/InterestSelection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slider } from "@/components/ui/slider";
import { Badge } from '@/components/ui/badge';
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { 
  experiences, 
  filterExperiences, 
  Experience, 
  getAllCities,
  getTrendingExperiences,
  getHiddenGemExperiences,
  getFlashDealExperiences,
  getAllLanguages,
  getAllActivityTypes,
  getAllAccessibilityFeatures
} from '@/lib/data';
import { Search, Filter, X, Sparkles, Gem, Zap, Clock, ArrowDownUp, Calendar, Globe, Compass, Accessibility } from 'lucide-react';
import { toast } from 'sonner';

const Explore = () => {
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
  
  // New state for additional filters
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
  
  // Auto refresh the listings every hour
  useEffect(() => {
    const interval = setInterval(() => {
      // This would normally fetch fresh data from the server
      toast.info("Event listings refreshed", {
        description: "Showing the latest events in your area"
      });
    }, 60 * 60 * 1000); // 1 hour
    
    return () => clearInterval(interval);
  }, []);
  
  // Ensure that we're showing all events on page load
  useEffect(() => {
    setTimeFrame('all');
    setSelectedCities([]);
    setShowOnlyTrending(false);
    setShowOnlyHiddenGems(false);
    setShowOnlyFlashDeals(false);
  }, []);
  
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
  
  // Get filtered experiences based on all criteria
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
     selectedAccessibility.freeForAssistants) ? selectedAccessibility : undefined
  );
  
  // Apply search query filter
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
  
  // Apply sorting
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
  
  // Get curated lists for tabs
  const trendingExperiences = getTrendingExperiences();
  const hiddenGemExperiences = getHiddenGemExperiences();
  const flashDealExperiences = getFlashDealExperiences();
  
  // Used to prevent rendering TabsContent elements until we have data - fixes the React error
  const hasExperiences = experiences.length > 0;
  
  // Helper function to count total active filters
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
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-20 pb-16">
        <div className="container px-4 md:px-6">
          {/* Search & Filter */}
          <div className="mb-8">
            <div className="relative mb-4">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <input
                type="text"
                placeholder="Search events, categories, locations..."
                className="w-full bg-background border rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-primary/50"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  onClick={() => setSearchQuery('')}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
                {activeFiltersCount > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {activeFiltersCount}
                  </span>
                )}
              </Button>
              
              <div className="flex items-center gap-3 flex-wrap">
                <div className="flex items-center gap-2">
                  <Switch 
                    id="today-only"
                    checked={timeFrame === 'today'} 
                    onCheckedChange={(checked) => setTimeFrame(checked ? 'today' : 'all')}
                  />
                  <Label htmlFor="today-only" className="text-sm cursor-pointer">Today only</Label>
                </div>
                
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                    onClick={() => setSortOption('time-asc')}
                  >
                    <Clock size={14} />
                    Soonest
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-1 text-xs"
                    onClick={() => setSortOption(sortOption === 'price-asc' ? 'price-desc' : 'price-asc')}
                  >
                    <ArrowDownUp size={14} />
                    Price
                  </Button>
                </div>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-background border rounded-lg animate-scale-in">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4">Filter by interest</h3>
                      <InterestSelection
                        selectedInterests={selectedInterests}
                        onChange={setSelectedInterests}
                        compact
                      />
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Filter by location</h3>
                      <div className="flex flex-wrap gap-2">
                        {cities.map(city => (
                          <Badge 
                            key={city}
                            variant={selectedCities.includes(city) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleCity(city)}
                          >
                            {city}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4">Price range</h3>
                      <div className="px-2">
                        <Slider
                          defaultValue={[maxPrice]}
                          max={150}
                          step={5}
                          onValueChange={(value) => setMaxPrice(value[0])}
                        />
                        <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                          <span>$0</span>
                          <span>Up to ${maxPrice}</span>
                          <span>$150+</span>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Calendar size={16} />
                        Time of day
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="morning"
                            checked={selectedTimeOfDay.includes('morning')}
                            onCheckedChange={() => toggleTimeOfDay('morning')}
                          />
                          <Label htmlFor="morning" className="text-sm">
                            Morning (before 12 PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="afternoon"
                            checked={selectedTimeOfDay.includes('afternoon')}
                            onCheckedChange={() => toggleTimeOfDay('afternoon')}
                          />
                          <Label htmlFor="afternoon" className="text-sm">
                            Afternoon (12 PM - 5 PM)
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox 
                            id="evening"
                            checked={selectedTimeOfDay.includes('evening')}
                            onCheckedChange={() => toggleTimeOfDay('evening')}
                          />
                          <Label htmlFor="evening" className="text-sm">
                            Evening (after 5 PM)
                          </Label>
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Globe size={16} />
                        Languages available
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        {languages.map(language => (
                          <Badge 
                            key={language}
                            variant={selectedLanguages.includes(language) ? "default" : "outline"}
                            className="cursor-pointer"
                            onClick={() => toggleLanguage(language)}
                          >
                            {language}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mt-6 mb-4">Special categories</h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="trending-only"
                            checked={showOnlyTrending} 
                            onCheckedChange={setShowOnlyTrending}
                          />
                          <Label htmlFor="trending-only" className="text-sm cursor-pointer flex items-center">
                            <Sparkles size={14} className="mr-1 text-pink-500" />
                            Trending experiences
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="hidden-gems-only"
                            checked={showOnlyHiddenGems} 
                            onCheckedChange={setShowOnlyHiddenGems}
                          />
                          <Label htmlFor="hidden-gems-only" className="text-sm cursor-pointer flex items-center">
                            <Gem size={14} className="mr-1 text-purple-500" />
                            Hidden gems
                          </Label>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <Switch 
                            id="flash-deals-only"
                            checked={showOnlyFlashDeals} 
                            onCheckedChange={setShowOnlyFlashDeals}
                          />
                          <Label htmlFor="flash-deals-only" className="text-sm cursor-pointer flex items-center">
                            <Zap size={14} className="mr-1 text-yellow-500" />
                            Flash deals
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column */}
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Compass size={16} />
                        Activity type
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        {activityTypes.map(type => (
                          <div key={type} className="flex items-center space-x-2">
                            <Checkbox 
                              id={`activity-${type.toLowerCase().replace(/\s+/g, '-')}`}
                              checked={selectedActivityTypes.includes(type)}
                              onCheckedChange={() => toggleActivityType(type)}
                            />
                            <Label 
                              htmlFor={`activity-${type.toLowerCase().replace(/\s+/g, '-')}`} 
                              className="text-sm"
                            >
                              {type}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-4 flex items-center gap-2">
                        <Accessibility size={16} />
                        Accessibility features
                      </h3>
                      
                      <div className="space-y-4">
                        <div>
                          <h4 className="text-sm font-medium mb-2">Mobility</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {accessibilityFeatures.mobility.map(feature => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`mobility-${feature.toLowerCase().replace(/\s+/g, '-')}`}
                                  checked={selectedAccessibility.mobility.includes(feature)}
                                  onCheckedChange={() => toggleAccessibilityFeature('mobility', feature)}
                                />
                                <Label 
                                  htmlFor={`mobility-${feature.toLowerCase().replace(/\s+/g, '-')}`} 
                                  className="text-sm"
                                >
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Communication</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {accessibilityFeatures.communication.map(feature => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`communication-${feature.toLowerCase().replace(/\s+/g, '-')}`}
                                  checked={selectedAccessibility.communication.includes(feature)}
                                  onCheckedChange={() => toggleAccessibilityFeature('communication', feature)}
                                />
                                <Label 
                                  htmlFor={`communication-${feature.toLowerCase().replace(/\s+/g, '-')}`} 
                                  className="text-sm"
                                >
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-2">Sensory</h4>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {accessibilityFeatures.sensory.map(feature => (
                              <div key={feature} className="flex items-center space-x-2">
                                <Checkbox 
                                  id={`sensory-${feature.toLowerCase().replace(/\s+/g, '-')}`}
                                  checked={selectedAccessibility.sensory.includes(feature)}
                                  onCheckedChange={() => toggleAccessibilityFeature('sensory', feature)}
                                />
                                <Label 
                                  htmlFor={`sensory-${feature.toLowerCase().replace(/\s+/g, '-')}`} 
                                  className="text-sm"
                                >
                                  {feature}
                                </Label>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 pt-2">
                          <Checkbox 
                            id="free-for-assistants"
                            checked={selectedAccessibility.freeForAssistants}
                            onCheckedChange={toggleFreeForAssistants}
                          />
                          <Label htmlFor="free-for-assistants" className="text-sm">
                            Free admission for people assisting guests with disabilities
                          </Label>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {activeFiltersCount > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => {
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
                      }}
                    >
                      Clear all filters
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Tabs for different experience types */}
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
            <TabsList className="w-full justify-start overflow-x-auto">
              <TabsTrigger value="all">All Events</TabsTrigger>
              <TabsTrigger value="trending" className="flex items-center gap-1">
                <Sparkles size={14} />
                Trending
              </TabsTrigger>
              <TabsTrigger value="hidden-gems" className="flex items-center gap-1">
                <Gem size={14} />
                Hidden Gems
              </TabsTrigger>
              <TabsTrigger value="flash-deals" className="flex items-center gap-1">
                <Zap size={14} />
                Flash Deals
              </TabsTrigger>
            </TabsList>
          
            <div className="mb-6 mt-4">
              <h1 className="text-2xl font-bold mb-2">
                {activeTab === 'all' && 'Explore Events'}
                {activeTab === 'trending' && 'Trending Events'}
                {activeTab === 'hidden-gems' && 'Hidden Gems'}
                {activeTab === 'flash-deals' && 'Flash Deals'}
              </h1>
              <p className="text-muted-foreground">
                {activeTab === 'all' && `${filteredExperiences.length} events in ${selectedCities.length > 0 ? selectedCities.join(', ') : 'KWCG region'}`}
                {activeTab === 'trending' && `${trendingExperiences.length} events everyone's talking about`}
                {activeTab === 'hidden-gems' && `${hiddenGemExperiences.length} unique experiences you might have missed`}
                {activeTab === 'flash-deals' && `${flashDealExperiences.length} limited-time deals available now`}
                {timeFrame === 'today' && ' happening today'}
                {timeFrame === 'next48hours' && ' in the next 48 hours'}
              </p>
            </div>
          
            {hasExperiences && (
              <>
                <TabsContent value="all">
                  {filteredExperiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredExperiences.map((exp) => (
                        <ExperienceCard 
                          key={exp.id}
                          experience={exp}
                          onClick={handleExperienceClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                        <Search className="h-6 w-6 text-muted-foreground" />
                      </div>
                      <h3 className="text-lg font-medium mb-2">No events found</h3>
                      <p className="text-muted-foreground text-center max-w-md mb-6">
                        Try adjusting your filters or search query to find events that match your preferences.
                      </p>
                      <Button onClick={() => {
                        setSelectedInterests([]);
                        setSelectedCities([]);
                        setTimeFrame('all');
                        setSearchQuery('');
                        setMaxPrice(100);
                        setShowOnlyTrending(false);
                        setShowOnlyHiddenGems(false);
                        setShowOnlyFlashDeals(false);
                        setSelectedTimeOfDay([]);
                        setSelectedLanguages([]);
                        setSelectedActivityTypes([]);
                        setSelectedAccessibility({
                          mobility: [],
                          communication: [],
                          sensory: [],
                          freeForAssistants: false
                        });
                      }}>
                        Clear all filters
                      </Button>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="trending">
                  {trendingExperiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {trendingExperiences.map((exp) => (
                        <ExperienceCard 
                          key={exp.id}
                          experience={exp}
                          onClick={handleExperienceClick}
                          featured={true}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <p className="text-muted-foreground text-center">
                        No trending events available at the moment. Check back soon!
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="hidden-gems">
                  {hiddenGemExperiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {hiddenGemExperiences.map((exp) => (
                        <ExperienceCard 
                          key={exp.id}
                          experience={exp}
                          onClick={handleExperienceClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <p className="text-muted-foreground text-center">
                        No hidden gem events available at the moment. Check back soon!
                      </p>
                    </div>
                  )}
                </TabsContent>
                
                <TabsContent value="flash-deals">
                  {flashDealExperiences.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {flashDealExperiences.map((exp) => (
                        <ExperienceCard 
                          key={exp.id}
                          experience={exp}
                          onClick={handleExperienceClick}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-16">
                      <p className="text-muted-foreground text-center">
                        No flash deals available at the moment. Check back soon!
                      </p>
                    </div>
                  )}
                </TabsContent>
              </>
            )}
          </Tabs>
        </div>
      </main>
      
      {/* Booking Modal */}
      <BookingModal
        experience={selectedExperience}
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
};

export default Explore;
