
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Menu } from 'lucide-react';

const Header: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = React.useState(false);
  
  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const isHomePage = location.pathname === '/';
  
  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out px-4 py-3 md:px-6 md:py-4",
        {
          'bg-transparent': !scrolled && isHomePage,
          'bg-background/70 backdrop-blur-lg shadow-sm': scrolled || !isHomePage
        }
      )}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <Link 
          to="/" 
          className="flex items-center space-x-2"
        >
          <div className="w-9 h-9 bg-primary rounded-full flex items-center justify-center">
            <span className="text-primary-foreground font-semibold text-lg">L</span>
          </div>
          <span className="font-medium text-lg tracking-tight">Local</span>
        </Link>
        
        <div className="flex items-center">
          <div className="flex items-center mr-3">
            <MapPin size={16} className="text-muted-foreground" />
            <span className="ml-1 text-sm font-medium">Kitchener-Waterloo</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-6">
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/explore">Explore</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/tickets">My Tickets</Link>
            </Button>
            <Button variant="ghost" size="sm" className="rounded-full" asChild>
              <Link to="/profile">Profile</Link>
            </Button>
          </div>
          
          <Button size="icon" variant="ghost" className="ml-2 md:hidden">
            <Menu size={20} />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Header;
