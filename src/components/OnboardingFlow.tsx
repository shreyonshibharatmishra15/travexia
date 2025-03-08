
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import InterestSelection from './InterestSelection';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface OnboardingFlowProps {
  onComplete: (interests: string[]) => void;
}

const OnboardingFlow: React.FC<OnboardingFlowProps> = ({ onComplete }) => {
  const [step, setStep] = useState(0);
  const [selectedInterests, setSelectedInterests] = useState<string[]>([]);
  
  const steps = [
    {
      title: "Welcome to Local",
      description: "Discover authentic experiences in Kitchener-Waterloo that match your interests.",
      content: (
        <div className="flex flex-col items-center justify-center py-8">
          <img 
            src="https://images.unsplash.com/photo-1501854140801-50d01698950b" 
            alt="Welcome"
            className="w-full max-w-xs rounded-xl mb-8 shadow-lg"
          />
          <p className="text-center text-muted-foreground mb-8 max-w-md">
            We help you discover and book unique local experiences, from food tours to pottery classes, right here in KW.
          </p>
        </div>
      )
    },
    {
      title: "Tell us what you love",
      description: "Select your interests so we can personalize your experience.",
      content: (
        <div className="py-6">
          <InterestSelection
            selectedInterests={selectedInterests}
            onChange={setSelectedInterests}
          />
          <p className="text-sm text-muted-foreground mt-6 text-center">
            Select at least one interest to continue
          </p>
        </div>
      )
    },
    {
      title: "You're all set!",
      description: "Let's find your perfect local experience.",
      content: (
        <div className="flex flex-col items-center justify-center py-8">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mb-6">
            <ArrowRight size={32} className="text-primary" />
          </div>
          <p className="text-center text-muted-foreground mb-8 max-w-md">
            We've personalized our recommendations based on your interests. Ready to explore Kitchener-Waterloo?
          </p>
        </div>
      )
    }
  ];
  
  const currentStep = steps[step];
  
  const handleNext = () => {
    if (step === 1 && selectedInterests.length === 0) {
      return;
    }
    
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onComplete(selectedInterests);
    }
  };
  
  return (
    <div className="fixed inset-0 bg-background flex items-center justify-center p-4 z-50 animate-fade-in">
      <Card className="w-full max-w-md mx-auto overflow-hidden shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-semibold mb-1">{currentStep.title}</h2>
          <p className="text-muted-foreground mb-6">{currentStep.description}</p>
          
          {currentStep.content}
          
          <div className="flex justify-between mt-4">
            {step > 0 ? (
              <Button 
                variant="outline" 
                onClick={() => setStep(step - 1)}
              >
                Back
              </Button>
            ) : (
              <div></div>
            )}
            
            <Button 
              onClick={handleNext}
              disabled={step === 1 && selectedInterests.length === 0}
              className={cn("px-8", {
                "animate-pulse": step === 1 && selectedInterests.length > 0
              })}
            >
              {step === steps.length - 1 ? "Get Started" : "Next"}
            </Button>
          </div>
        </div>
        
        <div className="w-full bg-muted h-1">
          <div 
            className="bg-primary h-full transition-all duration-500"
            style={{ width: `${((step + 1) / steps.length) * 100}%` }}
          />
        </div>
      </Card>
    </div>
  );
};

export default OnboardingFlow;
