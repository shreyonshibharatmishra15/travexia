
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Experience } from '@/lib/data';
import { Clock, Calendar, CreditCard, AppleIcon, Phone } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

interface BookingModalProps {
  experience: Experience | null;
  open: boolean;
  onClose: () => void;
}

const BookingModal: React.FC<BookingModalProps> = ({ experience, open, onClose }) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isBooking, setIsBooking] = useState(false);
  const navigate = useNavigate();
  
  if (!experience) return null;
  
  const handleBook = () => {
    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }
    
    setIsBooking(true);
    
    // Simulate booking process
    setTimeout(() => {
      setIsBooking(false);
      onClose();
      toast.success("Booking confirmed!");
      navigate(`/booking-confirmation/${experience.id}`, { 
        state: { 
          experience,
          selectedTime,
          ticketId: Math.random().toString(36).substring(2, 10).toUpperCase()
        } 
      });
    }, 1500);
  };
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book Experience</DialogTitle>
          <DialogDescription>
            Complete your booking for {experience.title}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 pt-2">
          <div className="space-y-2">
            <div className="relative rounded-md overflow-hidden aspect-video">
              <img 
                src={experience.image} 
                alt={experience.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex justify-between items-start mt-3">
              <h3 className="font-medium">{experience.title}</h3>
              <span className="font-semibold">${experience.price}</span>
            </div>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <Clock size={14} className="mr-1" />
              {experience.duration}
              <span className="mx-2">•</span>
              <Badge variant="outline" className="text-xs">
                {experience.provider}
              </Badge>
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Select time</Label>
            <div className="grid grid-cols-2 gap-2">
              {experience.availableTimes.map((time) => (
                <Button
                  key={time}
                  type="button"
                  variant={selectedTime === time ? "default" : "outline"}
                  className="justify-start"
                  onClick={() => setSelectedTime(time)}
                >
                  <Calendar className="mr-2 h-4 w-4" />
                  {time}
                </Button>
              ))}
            </div>
          </div>
          
          <div>
            <Label className="mb-2 block">Payment method</Label>
            <RadioGroup 
              value={paymentMethod} 
              onValueChange={setPaymentMethod}
              className="grid grid-cols-1 gap-2"
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex items-center cursor-pointer">
                  <CreditCard className="mr-2 h-4 w-4" />
                  Credit/Debit Card
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="apple" id="apple" />
                <Label htmlFor="apple" className="flex items-center cursor-pointer">
                  <AppleIcon className="mr-2 h-4 w-4" />
                  Apple Pay
                </Label>
              </div>
            </RadioGroup>
          </div>
          
          <div className="border-t pt-4">
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Experience Price</span>
              <span>${experience.price.toFixed(2)}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-muted-foreground">Service Fee</span>
              <span>${(experience.price * 0.1).toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>Total</span>
              <span>${(experience.price * 1.1).toFixed(2)}</span>
            </div>
          </div>
          
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button 
              onClick={handleBook} 
              disabled={!selectedTime || isBooking}
              className="min-w-[120px]"
            >
              {isBooking ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
