
import React from 'react';
import { Button } from '@/components/ui/button';
import { Filter } from 'lucide-react';

interface FilterToggleProps {
  showFilters: boolean;
  setShowFilters: (show: boolean) => void;
  activeFiltersCount: number;
}

const FilterToggle = ({ showFilters, setShowFilters, activeFiltersCount }: FilterToggleProps) => {
  return (
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
  );
};

export default FilterToggle;
