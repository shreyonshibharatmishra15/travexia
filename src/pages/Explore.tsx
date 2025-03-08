
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
import { 
  experiences, 
  filterExperiences, 
  Experience, 
  getAllCities,
  getTrendingExperiences,
  getHiddenGemExperiences,
  getFlashDealExperiences
} from '@/lib/data';
import { Search, Filter, X, Sparkles, Gem, Zap, Clock, ArrowDownUp } from 'lucide-react';
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
  
  // Get filtered experiences based on all criteria
  let filteredExperiences = filterExperiences(
    selectedInterests,
    timeFrame,
    selectedCities,
    showOnlyTrending,
    showOnlyHiddenGems,
    showOnlyFlashDeals,
    maxPrice
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
                {(selectedInterests.length > 0 || selectedCities.length > 0) && (
                  <span className="ml-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {selectedInterests.length + selectedCities.length}
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
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    
                    <h3 className="font-medium mt-6 mb-4">Price range</h3>
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
                
                {(selectedInterests.length > 0 || selectedCities.length > 0 || maxPrice < 100 || 
                  showOnlyTrending || showOnlyHiddenGems || showOnlyFlashDeals) && (
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
