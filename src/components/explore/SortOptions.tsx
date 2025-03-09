
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Clock, ArrowDownUp, Calendar as CalendarIcon } from 'lucide-react';
import { Calendar } from '@/components/ui/calendar';
import { format, addDays } from 'date-fns';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { cn } from '@/lib/utils';

interface SortOptionsProps {
  timeFrame: 'today' | 'next48hours' | 'all';
  setTimeFrame: (timeFrame: 'today' | 'next48hours' | 'all') => void;
  setSortOption: (sortOption: 'price-asc' | 'price-desc' | 'rating-desc' | 'time-asc') => void;
  sortOption: 'price-asc' | 'price-desc' | 'rating-desc' | 'time-asc';
}

const SortOptions = ({ timeFrame, setTimeFrame, setSortOption, sortOption }: SortOptionsProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined);
  
  // Calculate date range (today and next 2 days)
  const today = new Date();
  const maxDate = addDays(today, 2);
  
  const handleDateSelect = (selectedDate: Date | undefined) => {
    setDate(selectedDate);
    if (selectedDate) {
      const selectedDay = format(selectedDate, 'yyyy-MM-dd');
      const todayStr = format(today, 'yyyy-MM-dd');
      
      if (selectedDay === todayStr) {
        setTimeFrame('today');
      } else {
        setTimeFrame('next48hours');
      }
    } else {
      setTimeFrame('all');
    }
  };
  
  return (
    <div className="flex items-center gap-3 flex-wrap">
      <div className="flex items-center gap-2">
        <Switch 
          id="today-only"
          checked={timeFrame === 'today'} 
          onCheckedChange={(checked) => {
            setTimeFrame(checked ? 'today' : 'all');
            if (!checked) setDate(undefined);
          }}
        />
        <Label htmlFor="today-only" className="text-sm cursor-pointer">Today only</Label>
      </div>
      
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="outline" size="sm" className="gap-1 text-xs">
            <CalendarIcon className="h-3.5 w-3.5" />
            {date ? format(date, 'MMM dd') : 'Next 2 Days'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={date}
            onSelect={handleDateSelect}
            disabled={(date) => {
              return date < today || date > maxDate;
            }}
            initialFocus
            className={cn("p-3 pointer-events-auto")}
          />
        </PopoverContent>
      </Popover>
      
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
