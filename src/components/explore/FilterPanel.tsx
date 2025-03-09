import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';
import { Calendar, Globe, Compass, Accessibility, Sparkles, Gem, Zap } from 'lucide-react';
import InterestSelection from '@/components/InterestSelection';

interface FilterPanelProps {
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  cities: string[];
  selectedCities: string[];
  toggleCity: (city: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  selectedTimeOfDay: ('morning' | 'afternoon' | 'evening')[];
  toggleTimeOfDay: (time: 'morning' | 'afternoon' | 'evening') => void;
  languages: string[];
  selectedLanguages: string[];
  toggleLanguage: (language: string) => void;
  activityTypes: string[];
  selectedActivityTypes: string[];
  toggleActivityType: (type: string) => void;
  accessibilityFeatures: {
    mobility: string[];
    communication: string[];
    sensory: string[];
  };
  selectedAccessibility: {
    mobility: string[];
    communication: string[];
    sensory: string[];
    freeForAssistants: boolean;
  };
  toggleAccessibilityFeature: (category: 'mobility' | 'communication' | 'sensory', feature: string) => void;
  toggleFreeForAssistants: () => void;
  showOnlyTrending: boolean;
  setShowOnlyTrending: (show: boolean) => void;
  showOnlyHiddenGems: boolean;
  setShowOnlyHiddenGems: (show: boolean) => void;
  showOnlyFlashDeals: boolean;
  setShowOnlyFlashDeals: (show: boolean) => void;
  clearAllFilters: () => void;
  activeFiltersCount: number;
}

const FilterPanel = ({
  selectedInterests,
  setSelectedInterests,
  cities,
  selectedCities,
  toggleCity,
  maxPrice,
  setMaxPrice,
  selectedTimeOfDay,
  toggleTimeOfDay,
  languages,
  selectedLanguages,
  toggleLanguage,
  activityTypes,
  selectedActivityTypes,
  toggleActivityType,
  accessibilityFeatures,
  selectedAccessibility,
  toggleAccessibilityFeature,
  toggleFreeForAssistants,
  showOnlyTrending,
  setShowOnlyTrending,
  showOnlyHiddenGems,
  setShowOnlyHiddenGems,
  showOnlyFlashDeals,
  setShowOnlyFlashDeals,
  clearAllFilters,
  activeFiltersCount
}: FilterPanelProps) => {
  return (
    <div className="mt-4 p-4 bg-background border rounded-lg animate-scale-in">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
            onClick={clearAllFilters}
          >
            Clear all filters
          </Button>
        </div>
      )}
    </div>
  );
};

export default FilterPanel;
