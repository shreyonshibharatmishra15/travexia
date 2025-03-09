
import React, { useState } from 'react';
import { Link, useLocation as useRouterLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Menu, Globe } from 'lucide-react';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { Badge } from '@/components/ui/badge';
import { useLocation } from '@/components/LocationContext';

const popularCities = [
  'Kitchener-Waterloo', 
  'Toronto', 
  'Vancouver', 
  'Montreal', 
  'New York', 
  'London', 
  'Tokyo', 
  'Paris',
  'Berlin',
  'Sydney'
];

const Header: React.FC = () => {
  const routerLocation = useRouterLocation();
  const [scrolled, setScrolled] = React.useState(false);
  const { currentLocation, setCurrentLocation } = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const { toast } = useToast();
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isHomePage = routerLocation.pathname === '/';

  const handleLocationChange = (city: string) => {
    setCurrentLocation(city);
    toast({
      title: "Location updated",
      description: `Showing experiences in ${city}`,
      duration: 3000,
    });
  };
  
  const handleLocationSearch = () => {
    if (searchQuery.trim()) {
      setCurrentLocation(searchQuery);
      setSearchQuery('');
      toast({
        title: "Location updated",
        description: `Showing experiences in ${searchQuery}`,
        duration: 3000,
      });
    }
  };
  
  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      toast({
        title: "Locating you...",
        description: "Please allow location access if prompted",
        duration: 3000,
      });
      
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // In a real app, we would use the coordinates to get the city name via reverse geocoding
          // For this demo, we'll just show a success message
          toast({
            title: "Location found",
            description: "Showing experiences near your current location",
            duration: 3000,
          });
          setCurrentLocation("Your current location");
        },
        (error) => {
          toast({
            title: "Location error",
            description: "Could not access your location. Please try again or select a city manually.",
            variant: "destructive",
            duration: 5000,
          });
        }
      );
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
        duration: 5000,
      });
    }
  };
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 md:px-6 md:py-4",
        {
          'bg-transparent': !scrolled && isHomePage,
          'bg-background/70 backdrop-blur-lg shadow-sm': scrolled || !isHomePage
        }
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="h-9">
            {/* Using consistent logo throughout the application */}
            <img 
              src="/lovable-uploads/db174c9e-c43b-4b6f-8c6e-4fe00d3500c3.png" 
              alt="Travexia" 
              className="h-7 md:h-9" 
            />
          </div>
        </Link>
        
        <div className="flex items-center">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center gap-1">
                <MapPin size={16} className="text-primary" />
                <span className="ml-1 text-sm font-medium max-w-[120px] truncate">{currentLocation}</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4">
              <div className="space-y-4">
                <h3 className="font-medium text-lg">Change location</h3>
                
                <div className="flex items-center space-x-2">
                  <Input
                    placeholder="Search for a city..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="flex-1"
                    onKeyDown={(e) => e.key === 'Enter' && handleLocationSearch()}
                  />
                  <Button onClick={handleLocationSearch} size="sm">
                    Search
                  </Button>
                </div>
                
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="w-full flex items-center justify-center gap-2"
                  onClick={handleUseMyLocation}
                >
                  <Globe size={16} />
                  Use my current location
                </Button>
                
                <div className="pt-2">
                  <h4 className="text-sm font-medium mb-2">Popular destinations</h4>
                  <div className="flex flex-wrap gap-2">
                    {popularCities.map(city => (
                      <Badge 
                        key={city}
                        variant="outline"
                        className="cursor-pointer hover:bg-secondary"
                        onClick={() => handleLocationChange(city)}
                      >
                        {city}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </PopoverContent>
          </Popover>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/explore">Explore</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/tickets">My Tickets</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/profile">Profile</Link>
            </Button>
          </div>
          
          <Button size="icon" variant="ghost" className="ml-2 md:hidden">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
