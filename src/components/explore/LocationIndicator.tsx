
import React from 'react';
import { MapPin } from 'lucide-react';

interface LocationIndicatorProps {
  currentLocation: string;
}

const LocationIndicator = ({ currentLocation }: LocationIndicatorProps) => {
  return (
    <div className="mb-4 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <MapPin size={16} className="text-primary" />
        <span className="text-sm font-medium">Showing experiences in {currentLocation}</span>
      </div>
    </div>
  );
};

export default LocationIndicator;
