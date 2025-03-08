
import React, { useState } from 'react';
import Header from '@/components/Header';
import ExperienceCard from '@/components/ExperienceCard';
import BookingModal from '@/components/BookingModal';
import InterestSelection from '@/components/InterestSelection';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { experiences, filterExperiences, Experience } from '@/lib/data';
import { Search, Filter, X } from 'lucide-react';

const Explore = () => {
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [todayOnly, setTodayOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowBookingModal(true);
  };
  
  const filteredExperiences = filterExperiences(selectedInterests, todayOnly)
    .filter(exp => 
      searchQuery ? 
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.categories.some(cat => cat.toLowerCase().includes(searchQuery.toLowerCase()))
        : true
    );
  
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
                placeholder="Search experiences, categories, locations..."
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
            
            <div className="flex items-center justify-between">
              <Button 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter size={16} />
                Filters
                {selectedInterests.length > 0 && (
                  <span className="ml-1 bg-primary text-primary-foreground w-5 h-5 rounded-full text-xs flex items-center justify-center">
                    {selectedInterests.length}
                  </span>
                )}
              </Button>
              
              <div className="flex items-center gap-2">
                <Switch 
                  id="today-only"
                  checked={todayOnly} 
                  onCheckedChange={setTodayOnly}
                />
                <Label htmlFor="today-only" className="text-sm cursor-pointer">Available today</Label>
              </div>
            </div>
            
            {showFilters && (
              <div className="mt-4 p-4 bg-background border rounded-lg animate-scale-in">
                <h3 className="font-medium mb-4">Filter by interest</h3>
                <InterestSelection
                  selectedInterests={selectedInterests}
                  onChange={setSelectedInterests}
                  compact
                />
                
                {selectedInterests.length > 0 && (
                  <div className="mt-4 flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setSelectedInterests([])}
                    >
                      Clear all
                    </Button>
                  </div>
                )}
              </div>
            )}
          </div>
          
          {/* Results */}
          <div className="mb-6">
            <h1 className="text-2xl font-bold mb-2">Explore Experiences</h1>
            <p className="text-muted-foreground">
              {filteredExperiences.length} experiences in Kitchener-Waterloo
              {selectedInterests.length > 0 && ' matching your interests'}
              {todayOnly && ' available today'}
            </p>
          </div>
          
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
              <h3 className="text-lg font-medium mb-2">No experiences found</h3>
              <p className="text-muted-foreground text-center max-w-md mb-6">
                Try adjusting your filters or search query to find experiences that match your preferences.
              </p>
              <Button onClick={() => {
                setSelectedInterests([]);
                setTodayOnly(false);
                setSearchQuery('');
              }}>
                Clear all filters
              </Button>
            </div>
          )}
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
