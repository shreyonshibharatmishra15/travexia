
import React from 'react';
import { Interest, interests as allInterests } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InterestSelectionProps {
  selectedInterests: string[];
  onChange: (interests: string[]) => void;
  compact?: boolean;
}

const InterestSelection: React.FC<InterestSelectionProps> = ({
  selectedInterests,
  onChange,
  compact = false
}) => {
  const toggleInterest = (interest: Interest) => {
    if (selectedInterests.includes(interest.name)) {
      onChange(selectedInterests.filter(i => i !== interest.name));
    } else {
      onChange([...selectedInterests, interest.name]);
    }
  };

  return (
    <div className={cn(
      "grid gap-2",
      compact 
        ? "grid-cols-3 md:grid-cols-5" 
        : "grid-cols-2 sm:grid-cols-3 md:grid-cols-5"
    )}>
      {allInterests.map((interest) => {
        const isSelected = selectedInterests.includes(interest.name);
        
        return (
          <div
            key={interest.id}
            className={cn(
              "relative rounded-lg border border-border transition-all duration-300 overflow-hidden button-hover",
              isSelected ? "ring-2 ring-primary ring-offset-1 bg-primary/5" : "bg-card",
              compact ? "p-3" : "p-4"
            )}
            onClick={() => toggleInterest(interest)}
          >
            <div className="flex flex-col items-center justify-center text-center">
              {isSelected && (
                <div className="absolute top-2 right-2">
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                </div>
              )}
              
              <div className={cn(
                "flex items-center justify-center rounded-full mb-2",
                compact ? "w-8 h-8" : "w-12 h-12"
              )}>
                <img 
                  src={`/icons/${interest.icon}.svg`} 
                  alt={interest.name}
                  className={cn(
                    "opacity-80",
                    compact ? "w-5 h-5" : "w-6 h-6"
                  )}
                  onError={(e) => {
                    e.currentTarget.src = "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=50&h=50&fit=crop";
                  }}
                />
              </div>
              <span className={cn(
                "font-medium",
                compact ? "text-xs" : "text-sm"
              )}>
                {interest.name}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default InterestSelection;
