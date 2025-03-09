
import React from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { 
  Popover, 
  PopoverContent, 
  PopoverTrigger 
} from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { useLocation } from '@/components/LocationContext';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { getAllCities } from '@/lib/data';

interface LocationIndicatorProps {
  currentLocation: string;
}

const LocationIndicator = ({ currentLocation }: LocationIndicatorProps) => {
  const { setCurrentLocation } = useLocation();
  const [searchQuery, setSearchQuery] = React.useState('');
  const cities = getAllCities();
  
  // Filter cities based on search query
  const filteredCities = searchQuery 
    ? cities.filter(city => city.toLowerCase().includes(searchQuery.toLowerCase()))
    : cities;

  return (
    <div className="mb-4 flex items-center justify-between">
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="ghost" className="flex items-center gap-2 p-0 hover:bg-transparent">
            <div className="flex items-center gap-2">
              <MapPin size={16} className="text-primary" />
              <span className="text-sm font-medium">Exploring {currentLocation}</span>
              <ChevronDown size={14} className="text-muted-foreground" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-80 p-4" align="start">
          <div className="space-y-4">
            <h3 className="font-medium text-lg">Change location</h3>
            
            <div className="flex items-center space-x-2">
              <Input
                placeholder="Search for a city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
            </div>
            
            <div className="pt-2">
              <h4 className="text-sm font-medium mb-2">Available destinations</h4>
              <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto">
                {filteredCities.map(city => (
                  <Badge 
                    key={city}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary"
                    onClick={() => {
                      setCurrentLocation(city);
                      setSearchQuery('');
                    }}
                  >
                    {city}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default LocationIndicator;
