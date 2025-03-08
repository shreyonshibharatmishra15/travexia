
import React, { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Experience, getDisplayPrice } from '@/lib/data';
import { Clock, Calendar, CreditCard, AppleIcon, Phone, MapPin, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { format } from 'date-fns';

// Initialize Stripe - Replace with your Stripe publishable key
const stripePromise = loadStripe('pk_test_51OxJyJEZOqyXwEhKf2RMGgNd34VuRTXtR0vL5TRTc1C7OLFTnFgJ6L9rFX6Z7ixaL6kgJHCFdkDYxl1vXvPfYoVx00JCvOAHs0');

interface BookingModalProps {
  experience: Experience | null;
  open: boolean;
  onClose: () => void;
}

// Payment Form Component
const PaymentForm = ({ 
  experience, 
  selectedTime, 
  onSuccess, 
  onError 
}: { 
  experience: Experience; 
  selectedTime: string; 
  onSuccess: (paymentId: string) => void; 
  onError: (message: string) => void;
}) => {
  const stripe = useStripe();
  const elements = useElements();
  const [isProcessing, setIsProcessing] = useState(false);
  const displayPrice = getDisplayPrice(experience);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);

    try {
      // In a real implementation, you would create a payment intent on your server
      // Here we're simulating a successful payment
      const cardElement = elements.getElement(CardElement);
      
      if (!cardElement) {
        throw new Error("Card element not found");
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });

      if (error) {
        throw new Error(error.message);
      }

      // Simulate payment processing time
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Call success with the payment ID
      onSuccess(paymentMethod.id);
    } catch (error) {
      onError(error instanceof Error ? error.message : 'Payment failed');
    } finally {
      setIsProcessing(false);
    }
  };

  const serviceFee = displayPrice * 0.1;
  const totalPrice = displayPrice + serviceFee;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="p-4 border rounded-md bg-background">
        <CardElement className="py-4" options={{
          style: {
            base: {
              fontSize: '16px',
              color: '#424770',
              '::placeholder': {
                color: '#aab7c4',
              },
            },
            invalid: {
              color: '#9e2146',
            },
          },
        }} />
      </div>
      
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground">Event Price</span>
        <div className="text-right">
          {experience.flashDeal && experience.discountPercentage ? (
            <>
              <span className="line-through text-muted-foreground mr-2">${experience.price.toFixed(2)}</span>
              <span>${displayPrice.toFixed(2)}</span>
            </>
          ) : (
            <span>${displayPrice.toFixed(2)}</span>
          )}
        </div>
      </div>
      <div className="flex justify-between mb-2">
        <span className="text-muted-foreground">Service Fee</span>
        <span>${serviceFee.toFixed(2)}</span>
      </div>
      <div className="flex justify-between font-medium pt-2 border-t">
        <span>Total</span>
        <span>${totalPrice.toFixed(2)}</span>
      </div>
      
      <Button 
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? "Processing..." : `Pay $${totalPrice.toFixed(2)}`}
      </Button>
    </form>
  );
};

// Main BookingModal Component
const BookingModalContent = ({ experience, onClose }: Omit<BookingModalProps, 'open'>) => {
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('card');
  const [isBooking, setIsBooking] = useState(false);
  const [showPayment, setShowPayment] = useState(false);
  const navigate = useNavigate();
  
  if (!experience) return null;

  const startDate = new Date(experience.startDate);
  const formattedDate = format(startDate, 'EEEE, MMMM d, yyyy');
  const displayPrice = getDisplayPrice(experience);
  const isFlashDeal = experience.flashDeal && experience.discountPercentage;
  
  const handleProceedToPayment = () => {
    if (!selectedTime) {
      toast.error("Please select a time");
      return;
    }
    
    setShowPayment(true);
  };
  
  const handlePaymentSuccess = (paymentId: string) => {
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
          ticketId: Math.random().toString(36).substring(2, 10).toUpperCase(),
          paymentId
        } 
      });
    }, 500);
  };
  
  const handlePaymentError = (message: string) => {
    toast.error(message || "Payment failed. Please try again.");
  };
  
  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle>
          {showPayment ? "Payment Details" : "Book Experience"}
        </DialogTitle>
        <DialogDescription>
          {showPayment 
            ? "Complete payment to confirm your booking" 
            : `Complete your booking for ${experience.title}`}
        </DialogDescription>
      </DialogHeader>
      
      <div className="space-y-6 pt-2">
        {!showPayment ? (
          <>
            <div className="space-y-2">
              <div className="relative rounded-md overflow-hidden aspect-video">
                <img 
                  src={experience.image} 
                  alt={experience.title}
                  className="w-full h-full object-cover"
                />
                {isFlashDeal && (
                  <div className="absolute top-2 left-2">
                    <Badge className="bg-yellow-500 text-white">
                      <Zap size={14} className="mr-1" /> {experience.discountPercentage}% Off
                    </Badge>
                  </div>
                )}
              </div>
              
              <div className="flex justify-between items-start mt-3">
                <h3 className="font-medium">{experience.title}</h3>
                <div>
                  {isFlashDeal ? (
                    <div className="text-right">
                      <span className="text-sm line-through text-muted-foreground">${experience.price}</span>
                      <span className="font-semibold ml-2">${displayPrice}</span>
                    </div>
                  ) : (
                    <span className="font-semibold">${displayPrice}</span>
                  )}
                </div>
              </div>
              
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock size={14} className="mr-1" />
                {experience.duration}
                <span className="mx-2">•</span>
                <Badge variant="outline" className="text-xs">
                  {experience.provider}
                </Badge>
              </div>

              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin size={14} className="mr-1" />
                {experience.location}, {experience.city}
              </div>
              
              <div className="flex items-center text-sm font-medium mt-1">
                <Calendar size={14} className="mr-1" />
                {formattedDate}
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
                    <Clock className="mr-2 h-4 w-4" />
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
                <span className="text-muted-foreground">Event Price</span>
                <div>
                  {isFlashDeal ? (
                    <>
                      <span className="line-through text-muted-foreground mr-2">${experience.price.toFixed(2)}</span>
                      <span>${displayPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span>${displayPrice.toFixed(2)}</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-muted-foreground">Service Fee</span>
                <span>${(displayPrice * 0.1).toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-medium pt-2 border-t">
                <span>Total</span>
                <span>${(displayPrice * 1.1).toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={onClose}>Cancel</Button>
              <Button 
                onClick={handleProceedToPayment} 
                disabled={!selectedTime}
                className="min-w-[120px]"
              >
                Proceed to Payment
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <h3 className="font-medium mb-1">{experience.title}</h3>
              <p className="text-sm text-muted-foreground mb-2">
                {formattedDate} • {selectedTime}
              </p>
              
              <PaymentForm 
                experience={experience} 
                selectedTime={selectedTime}
                onSuccess={handlePaymentSuccess}
                onError={handlePaymentError}
              />
            </div>
            
            <div className="flex justify-end gap-2 mt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowPayment(false)}
                disabled={isBooking}
              >
                Back
              </Button>
            </div>
          </>
        )}
      </div>
    </DialogContent>
  );
};

const BookingModal: React.FC<BookingModalProps> = ({ experience, open, onClose }) => {
  if (!experience) return null;
  
  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <Elements stripe={stripePromise}>
        <BookingModalContent experience={experience} onClose={onClose} />
      </Elements>
    </Dialog>
  );
};

export default BookingModal;
