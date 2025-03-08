
import React from 'react';
import Header from '@/components/Header';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <>
      <Header />
      
      <main className="min-h-screen pt-24 pb-16">
        <div className="container px-4 md:px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl md:text-4xl font-bold mb-6">About Travexia</h1>
            
            <div className="space-y-8">
              <section>
                <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
                <p className="text-muted-foreground">
                  Travexia is a real-time event marketplace designed to connect people in the Kitchener-Waterloo-Cambridge-Guelph region with amazing local experiences. We believe that the best memories are created through authentic experiences, and we're passionate about making these accessible to everyone.
                </p>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <p className="text-muted-foreground mb-4">
                  We automatically update our platform with experiences happening within the next 48 hours, making it easy for you to discover and book last-minute events. From food tastings and live music to outdoor adventures and community workshops, Travexia is your go-to platform for local experiences.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Discover</h3>
                    <p className="text-sm text-muted-foreground">Browse through curated experiences happening near you in the next 48 hours.</p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Book</h3>
                    <p className="text-sm text-muted-foreground">Secure your spot with our easy booking system and payment processing.</p>
                  </div>
                  <div className="bg-secondary/30 p-6 rounded-lg">
                    <h3 className="font-medium mb-2">Experience</h3>
                    <p className="text-sm text-muted-foreground">Show your digital ticket at the venue and enjoy your experience!</p>
                  </div>
                </div>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">For Event Organizers</h2>
                <p className="text-muted-foreground mb-4">
                  Are you hosting an event in the KWCG region? Partner with Travexia to reach more attendees and manage your bookings seamlessly. Our platform provides tools for event management, real-time sales tracking, and audience insights.
                </p>
                <Button className="mt-2">Become a Partner</Button>
              </section>
              
              <section>
                <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
                <p className="text-muted-foreground mb-4">
                  Have questions or feedback? We'd love to hear from you! Reach out to our team at support@travexia.com or fill out our contact form.
                </p>
                <div className="flex space-x-4 mt-4">
                  <Button variant="outline">Contact Support</Button>
                  <Button variant="outline">FAQ</Button>
                </div>
              </section>
            </div>
            
            <div className="mt-12 text-center">
              <p className="text-muted-foreground mb-4">Ready to discover your next adventure?</p>
              <Button size="lg" asChild>
                <Link to="/explore">Explore Experiences</Link>
              </Button>
            </div>
          </div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className="bg-background border-t py-8">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <img 
                src="/lovable-uploads/db174c9e-c43b-4b6f-8c6e-4fe00d3500c3.png" 
                alt="Travexia" 
                className="h-8" 
              />
            </div>
            
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <Button variant="link" size="sm" asChild>
                <Link to="/about">About</Link>
              </Button>
              <Button variant="link" size="sm">FAQ</Button>
              <Button variant="link" size="sm">Support</Button>
              <Button variant="link" size="sm">Privacy Policy</Button>
            </div>
          </div>
          
          <div className="mt-8 pt-4 border-t text-center text-sm text-muted-foreground">
            © 2023 Travexia. All rights reserved. Focused on Kitchener-Waterloo region.
          </div>
        </div>
      </footer>
    </>
  );
};

export default About;
