
import React, { useState, useEffect } from 'react';
import Header from '@/components/Header';
import OnboardingFlow from '@/components/OnboardingFlow';
import ExperienceCard from '@/components/ExperienceCard';
import BookingModal from '@/components/BookingModal';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { experiences, filterExperiences, Experience } from '@/lib/data';
import { useNavigate } from 'react-router-dom';
import { Clock, ChevronRight, Filter } from 'lucide-react';

const Index = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [showBookingModal, setShowBookingModal] = useState(false);
  const navigate = useNavigate();
  
  // Check if this is the first visit
  useEffect(() => {
    const isFirstVisit = localStorage.getItem('hasVisited') !== 'true';
    setShowOnboarding(isFirstVisit);
  }, []);
  
  const handleOnboardingComplete = (interests: string[]) => {
    localStorage.setItem('hasVisited', 'true');
    setSelectedInterests(interests);
    setShowOnboarding(false);
  };
  
  const handleExperienceClick = (experience: Experience) => {
    setSelectedExperience(experience);
    setShowBookingModal(true);
  };
  
  const todaysExperiences = filterExperiences(selectedInterests, true);
  const recommendedExperiences = filterExperiences(selectedInterests).slice(0, 6);
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-16">
        {/* Hero Section */}
        <section className="relative h-[85vh] mb-12 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/70 z-10" />
          <img 
            src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05" 
            alt="Kitchener-Waterloo"
            className="absolute inset-0 w-full h-full object-cover"
          />
          
          <div className="relative z-20 container h-full flex flex-col justify-center items-start px-4 md:px-6">
            <div className="max-w-2xl animate-fade-in">
              <Badge className="mb-4 bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 border-none">
                Kitchener-Waterloo
              </Badge>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
                Discover authentic <br />local experiences
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-xl">
                Explore unique activities, workshops, and events in KW region. Book instantly and create unforgettable memories.
              </p>
              <Button 
                className="text-md px-8 py-6"
                onClick={() => navigate('/explore')}
              >
                Explore Now
              </Button>
            </div>
          </div>
        </section>
        
        {/* Today's Experiences */}
        <section className="container px-4 md:px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">Available Today</h2>
              <p className="text-muted-foreground">
                Experiences you can book right now
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/explore')}>
              See all <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {todaysExperiences.slice(0, 3).map((exp) => (
              <ExperienceCard 
                key={exp.id}
                experience={exp}
                onClick={handleExperienceClick}
                featured={exp.id === '1'}
              />
            ))}
          </div>
        </section>
        
        {/* Recommended Experiences */}
        <section className="container px-4 md:px-6 mb-16">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-semibold mb-1">
                {selectedInterests.length > 0 ? 'Recommended For You' : 'Popular Experiences'}
              </h2>
              <p className="text-muted-foreground">
                {selectedInterests.length > 0 
                  ? 'Based on your interests' 
                  : 'Top-rated experiences in Kitchener-Waterloo'}
              </p>
            </div>
            <Button variant="ghost" size="sm" className="gap-1" onClick={() => navigate('/explore')}>
              See all <ChevronRight size={16} />
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recommendedExperiences.map((exp) => (
              <ExperienceCard 
                key={exp.id}
                experience={exp}
                onClick={handleExperienceClick}
              />
            ))}
          </div>
        </section>
        
        {/* App Features Section */}
        <section className="bg-secondary/50 py-16">
          <div className="container px-4 md:px-6">
            <h2 className="text-2xl font-semibold text-center mb-12">How It Works</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Filter size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Tell us what you love</h3>
                <p className="text-muted-foreground">
                  Share your interests and we'll personalize your experience feed.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <Clock size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Book in seconds</h3>
                <p className="text-muted-foreground">
                  Find available experiences and secure your spot instantly.
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <ChevronRight size={24} className="text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-2">Enjoy your experience</h3>
                <p className="text-muted-foreground">
                  Simply show your digital ticket at the venue and you're good to go.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">L</span>
              </div>
              <span className="ml-2 font-medium">Local</span>
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <Button variant="link" size="sm">About</Button>
              <Button variant="link" size="sm">FAQ</Button>
              <Button variant="link" size="sm">Support</Button>
              <Button variant="link" size="sm">Privacy Policy</Button>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            © 2023 Local. All rights reserved. Focused on Kitchener-Waterloo region.
          </div>
        </div>
      </footer>
      
      {/* Onboarding */}
      {showOnboarding && (
        <OnboardingFlow onComplete={handleOnboardingComplete} />
      )}
      
      {/* Booking Modal */}
      <BookingModal
        experience={selectedExperience}
        open={showBookingModal}
        onClose={() => setShowBookingModal(false)}
      />
    </>
  );
};

export default Index;
