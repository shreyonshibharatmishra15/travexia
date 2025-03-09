
import React from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, ArrowDownUp } from 'lucide-react';

interface SortOptionsProps {
  timeFrame: 'today' | 'next48hours' | 'all';
  setTimeFrame: (timeFrame: 'today' | 'next48hours' | 'all') => void;
  setSortOption: (sortOption: 'price-asc' | 'price-desc' | 'rating-desc' | 'time-asc') => void;
  sortOption: 'price-asc' | 'price-desc' | 'rating-desc' | 'time-asc';
}

const SortOptions = ({ timeFrame, setTimeFrame, setSortOption, sortOption }: SortOptionsProps) => {
  return (
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
  );
};

export default SortOptions;
