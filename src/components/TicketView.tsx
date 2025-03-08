
import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Clock, Calendar, MapPin, QrCode } from 'lucide-react';
import { Experience } from '@/lib/data';
import { cn } from '@/lib/utils';

interface TicketViewProps {
  experience: Experience;
  ticketId: string;
  selectedTime: string;
  className?: string;
}

const TicketView: React.FC<TicketViewProps> = ({ 
  experience, 
  ticketId,
  selectedTime,
  className
}) => {
  return (
    <Card className={cn("overflow-hidden shadow-lg max-w-lg mx-auto", className)}>
      <div className="relative h-32 bg-primary/10">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <Badge className="mb-2 bg-primary/20 text-primary-foreground/90 hover:bg-primary/20 border-none">
              Confirmed
            </Badge>
            <h3 className="text-sm font-medium text-muted-foreground">Ticket ID: {ticketId}</h3>
          </div>
        </div>
      </div>
      
      <div className="p-5">
        <h2 className="text-xl font-semibold mb-3">{experience.title}</h2>
        
        <div className="space-y-3 mb-6">
          <div className="flex items-center">
            <Calendar className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Today</p>
              <p className="text-sm text-muted-foreground">{selectedTime}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Duration</p>
              <p className="text-sm text-muted-foreground">{experience.duration}</p>
            </div>
          </div>
          
          <div className="flex items-center">
            <MapPin className="h-5 w-5 text-muted-foreground mr-3" />
            <div>
              <p className="text-sm font-medium">Location</p>
              <p className="text-sm text-muted-foreground">{experience.location}</p>
            </div>
          </div>
        </div>
        
        <div className="flex justify-center mb-6">
          <div className="bg-white p-2 rounded-md shadow">
            <QrCode className="h-32 w-32" />
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground mb-4">
          Present this QR code at the venue to check in
        </div>
        
        <div className="flex justify-between">
          <Button variant="outline" className="w-[48%]">View Map</Button>
          <Button className="w-[48%]">Add to Calendar</Button>
        </div>
      </div>
      
      <div className="bg-secondary py-3 px-5 text-center text-sm">
        <span className="font-medium">Provider: </span> 
        <span className="text-muted-foreground">{experience.provider}</span>
        <span className="mx-2">•</span>
        <span className="font-medium">Total Paid: </span>
        <span className="text-muted-foreground">${(experience.price * 1.1).toFixed(2)}</span>
      </div>
    </Card>
  );
};

export default TicketView;
