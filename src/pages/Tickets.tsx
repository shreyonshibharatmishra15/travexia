
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import TicketView from '@/components/TicketView';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Calendar, Ticket, Package, ArrowLeft } from 'lucide-react';
import { experiences, Experience } from '@/lib/data';

const Tickets = () => {
  const navigate = useNavigate();
  const [upcomingTickets, setUpcomingTickets] = useState<{ 
    experience: Experience; 
    ticketId: string;
    selectedTime: string;
    date: Date;
  }[]>([]);
  const [pastTickets, setPastTickets] = useState<{
    experience: Experience;
    ticketId: string;
    selectedTime: string;
    date: Date;
  }[]>([]);
  
  // Simulate loading tickets from API or localStorage
  useEffect(() => {
    // For demo purposes, create some mock tickets
    const mockUpcoming = [
      {
        experience: experiences[0],
        ticketId: 'FOOD42XL',
        selectedTime: '1:00 PM',
        date: new Date(new Date().setDate(new Date().getDate() + 1)),
      }
    ];
    
    const mockPast = [
      {
        experience: experiences[2],
        ticketId: 'ART38TD',
        selectedTime: '11:00 AM',
        date: new Date(new Date().setDate(new Date().getDate() - 5)),
      }
    ];
    
    setUpcomingTickets(mockUpcoming);
    setPastTickets(mockPast);
  }, []);
  
  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
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
          
          <h1 className="text-2xl font-bold mb-6">My Tickets</h1>
          
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList className="mb-4">
              <TabsTrigger value="upcoming" className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                Upcoming
              </TabsTrigger>
              <TabsTrigger value="past" className="flex items-center gap-2">
                <Package className="h-4 w-4" />
                Past
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming">
              {upcomingTickets.length > 0 ? (
                <div className="space-y-8">
                  {upcomingTickets.map((ticket, index) => (
                    <div key={index} className="animate-fade-in">
                      <div className="mb-2 font-medium text-sm">
                        {formatDate(ticket.date)}
                      </div>
                      <TicketView 
                        experience={ticket.experience}
                        selectedTime={ticket.selectedTime}
                        ticketId={ticket.ticketId}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Ticket className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No upcoming tickets</h3>
                  <p className="text-muted-foreground text-center max-w-md mb-6">
                    You haven't booked any experiences yet. Explore what's available and book your next adventure!
                  </p>
                  <Button onClick={() => navigate('/explore')}>Find Experiences</Button>
                </div>
              )}
            </TabsContent>
            
            <TabsContent value="past">
              {pastTickets.length > 0 ? (
                <div className="space-y-8">
                  {pastTickets.map((ticket, index) => (
                    <div key={index} className="animate-fade-in">
                      <div className="mb-2 font-medium text-sm">
                        {formatDate(ticket.date)}
                      </div>
                      <TicketView 
                        experience={ticket.experience}
                        selectedTime={ticket.selectedTime}
                        ticketId={ticket.ticketId}
                      />
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 animate-fade-in">
                  <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
                    <Package className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">No past experiences</h3>
                  <p className="text-muted-foreground text-center max-w-md">
                    Your completed experiences will show up here after you've attended them.
                  </p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default Tickets;
