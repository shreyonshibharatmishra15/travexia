
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, MapPin, Star } from 'lucide-react';
import { Experience } from '@/lib/data';
import { cn } from '@/lib/utils';

interface ExperienceCardProps {
  experience: Experience;
  onClick: (experience: Experience) => void;
  featured?: boolean;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ 
  experience, 
  onClick,
  featured = false 
}) => {
  return (
    <Card 
      className={cn(
        "overflow-hidden transition-all duration-300 hover:shadow-lg cursor-pointer button-hover border-0 group",
        featured ? "h-[380px] md:h-[450px]" : "h-[320px]"
      )}
      onClick={() => onClick(experience)}
    >
      <div className="relative h-full flex flex-col">
        <div 
          className={cn(
            "relative overflow-hidden",
            featured ? "h-[55%]" : "h-[45%]"
          )}
        >
          <img 
            src={experience.image} 
            alt={experience.title}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
          />
          
          {experience.availableToday && (
            <Badge 
              className="absolute top-3 left-3 bg-green-500 hover:bg-green-600 text-white animate-scale-in"
            >
              Available Today
            </Badge>
          )}
          
          <div className="absolute bottom-3 right-3">
            <Badge variant="secondary" className="font-medium">
              {experience.provider}
            </Badge>
          </div>
        </div>
        
        <div className="p-4 flex flex-col flex-grow">
          <div className="flex justify-between items-start mb-1">
            <h3 className="font-semibold text-lg line-clamp-1">{experience.title}</h3>
            <span className="font-semibold">${experience.price}</span>
          </div>
          
          <div className="flex items-center text-sm text-muted-foreground mb-2 gap-x-3">
            <div className="flex items-center">
              <Clock size={14} className="mr-1" />
              {experience.duration}
            </div>
            <div className="flex items-center">
              <MapPin size={14} className="mr-1" />
              <span className="line-clamp-1">{experience.location}</span>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
            {experience.description}
          </p>
          
          <div className="flex items-center mt-auto">
            <div className="flex items-center">
              <Star size={16} className="text-yellow-500 fill-yellow-500 mr-1" />
              <span className="font-medium mr-1">{experience.rating}</span>
              <span className="text-muted-foreground text-sm">
                ({experience.reviewCount})
              </span>
            </div>
            
            <div className="ml-auto flex flex-wrap gap-1">
              {experience.categories.slice(0, 2).map((category, i) => (
                <Badge 
                  key={i} 
                  variant="outline" 
                  className="text-xs bg-secondary/50"
                >
                  {category}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ExperienceCard;
