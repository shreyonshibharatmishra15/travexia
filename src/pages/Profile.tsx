
import React, { useState } from 'react';
import Header from '@/components/Header';
import InterestSelection from '@/components/InterestSelection';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { User, Bell, LogOut, ChevronRight, Heart, Settings, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Profile = () => {
  const navigate = useNavigate();
  const [selectedInterests, setSelectedInterests] = useState<string[]>([
    'Food & Drink', 'Music', 'Nature'
  ]);
  
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    newExperiences: true,
    promotions: false
  });
  
  const handleSaveInterests = () => {
    toast.success('Preferences saved successfully');
  };
  
  const handleLogout = () => {
    navigate('/');
    toast.success('Logged out successfully');
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
          
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center mb-8">
              <Avatar className="h-20 w-20 mr-4 border-2 border-primary/20">
                <AvatarImage src="" />
                <AvatarFallback className="bg-primary/10 text-primary text-xl font-medium">
                  JD
                </AvatarFallback>
              </Avatar>
              
              <div>
                <h1 className="text-2xl font-bold">John Doe</h1>
                <p className="text-muted-foreground">john.doe@example.com</p>
              </div>
              
              <Button variant="outline" size="sm" className="ml-auto">
                Edit Profile
              </Button>
            </div>
            
            <div className="space-y-8">
              {/* Interests */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">My Interests</h2>
                  <Heart className="text-muted-foreground" size={20} />
                </div>
                
                <p className="text-muted-foreground mb-6">
                  Update your interests to get personalized experience recommendations.
                </p>
                
                <InterestSelection
                  selectedInterests={selectedInterests}
                  onChange={setSelectedInterests}
                />
                
                <div className="mt-6 flex justify-end">
                  <Button onClick={handleSaveInterests}>
                    Save Preferences
                  </Button>
                </div>
              </div>
              
              {/* Notifications */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Notifications</h2>
                  <Bell className="text-muted-foreground" size={20} />
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive booking confirmations and updates via email
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.email} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, email: checked})
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Get real-time updates about your bookings and experiences
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.push} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, push: checked})
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">New Experiences</h3>
                      <p className="text-sm text-muted-foreground">
                        Be notified when new experiences matching your interests are added
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.newExperiences} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, newExperiences: checked})
                      }
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Promotions & Offers</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive special offers, discounts, and promotional updates
                      </p>
                    </div>
                    <Switch 
                      checked={notifications.promotions} 
                      onCheckedChange={(checked) => 
                        setNotifications({...notifications, promotions: checked})
                      }
                    />
                  </div>
                </div>
              </div>
              
              {/* Account Settings */}
              <div className="bg-card rounded-lg p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">Account Settings</h2>
                  <Settings className="text-muted-foreground" size={20} />
                </div>
                
                <ul className="space-y-2">
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-normal text-base"
                    >
                      <span className="flex items-center">
                        <User className="mr-2 h-4 w-4 text-muted-foreground" />
                        Personal Information
                      </span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Button>
                  </li>
                  
                  <Separator />
                  
                  <li>
                    <Button 
                      variant="ghost" 
                      className="w-full justify-between font-normal text-base"
                    >
                      <span className="flex items-center">
                        <Bell className="mr-2 h-4 w-4 text-muted-foreground" />
                        Preferences
                      </span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Button>
                  </li>
                  
                  <Separator />
                  
                  <li>
                    <Button 
                      variant="ghost"
                      className="w-full justify-between font-normal text-base hover:text-destructive"
                      onClick={handleLogout}
                    >
                      <span className="flex items-center">
                        <LogOut className="mr-2 h-4 w-4 text-muted-foreground" />
                        Log Out
                      </span>
                      <ChevronRight size={16} className="text-muted-foreground" />
                    </Button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default Profile;
