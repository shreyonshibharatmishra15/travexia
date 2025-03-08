
import React, { useEffect } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TicketView from '@/components/TicketView';
import { Button } from '@/components/ui/button';
import { CheckCircle, Calendar, Share2, ArrowLeft } from 'lucide-react';
import { getExperienceById, Experience } from '@/lib/data';
import { toast } from 'sonner';

interface LocationState {
  experience: Experience;
  selectedTime: string;
  ticketId: string;
}

const BookingConfirmation = () => {
  const { id } = useParams<{ id: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as LocationState;
  
  // If navigated directly without state, try to get experience from ID
  const experience = state?.experience || (id ? getExperienceById(id) : null);
  const selectedTime = state?.selectedTime || '10:00 AM';
  const ticketId = state?.ticketId || 'TICKET123';
  
  useEffect(() => {
    if (!experience) {
      navigate('/');
      toast.error('Experience not found');
    }
  }, [experience, navigate]);
  
  if (!experience) {
    return null;
  }
  
  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `My Ticket: ${experience.title}`,
        text: `Check out this experience I'm attending: ${experience.title}`,
        url: window.location.href,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      toast.success('Ticket link copied to clipboard!');
    }
  };
  
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-20 pb-16">
        <div className="container px-4 md:px-6">
          <Button 
            variant="ghost"
            size="sm"
            className="mb-6"
            onClick={() => navigate('/')}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to home
          </Button>
          
          <div className="max-w-2xl mx-auto mb-10 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h1 className="text-2xl font-bold mb-2">Booking Confirmed!</h1>
            <p className="text-muted-foreground max-w-md mx-auto">
              Your ticket for {experience.title} has been confirmed. You'll also receive a confirmation email shortly.
            </p>
          </div>
          
          <TicketView 
            experience={experience}
            selectedTime={selectedTime}
            ticketId={ticketId}
            className="animate-scale-in mb-8"
          />
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-lg mx-auto">
            <Button className="flex-1" onClick={() => navigate('/tickets')}>
              <Calendar className="mr-2 h-4 w-4" />
              View All Tickets
            </Button>
            <Button variant="outline" className="flex-1" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" />
              Share Ticket
            </Button>
          </div>
        </div>
      </main>
    </>
  );
};

export default BookingConfirmation;
