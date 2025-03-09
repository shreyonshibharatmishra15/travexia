
import React from 'react';
import { Search, Sparkles, Gem, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ExperienceCard from '@/components/ExperienceCard';
import { Experience } from '@/lib/data';

interface ExperienceListProps {
  experiences: Experience[];
  handleExperienceClick: (experience: Experience) => void;
  activeTab: string;
  clearFilters: () => void;
}

const ExperienceList = ({ 
  experiences, 
  handleExperienceClick, 
  activeTab,
  clearFilters
}: ExperienceListProps) => {
  if (experiences.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {experiences.map((exp) => (
          <ExperienceCard 
            key={exp.id}
            experience={exp}
            onClick={handleExperienceClick}
            featured={activeTab === 'personalized' || activeTab === 'trending'}
          />
        ))}
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
          {activeTab === 'personalized' ? (
            <Sparkles className="h-6 w-6 text-muted-foreground" />
          ) : (
            <Search className="h-6 w-6 text-muted-foreground" />
          )}
        </div>
        
        {activeTab === 'personalized' ? (
          <>
            <h3 className="text-lg font-medium mb-2">Tell us what you like</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Select some interests to help us personalize your experience recommendations.
            </p>
          </>
        ) : (
          <>
            <h3 className="text-lg font-medium mb-2">No events found</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Try adjusting your filters or search query to find events that match your preferences.
            </p>
            <Button onClick={clearFilters}>
              Clear all filters
            </Button>
          </>
        )}
      </div>
    );
  }
};

export default ExperienceList;
