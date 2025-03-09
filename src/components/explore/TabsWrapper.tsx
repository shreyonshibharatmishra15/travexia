
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Gem, Zap } from 'lucide-react';
import ExperienceList from './ExperienceList';
import { Experience } from '@/lib/data';
import InterestSelection from '@/components/InterestSelection';

interface TabsWrapperProps {
  activeTab: string;
  setActiveTab: (value: string) => void;
  filteredExperiences: Experience[];
  personalizedExperiences: Experience[];
  trendingExperiences: Experience[];
  hiddenGemExperiences: Experience[];
  flashDealExperiences: Experience[];
  currentLocation: string;
  timeFrame: 'today' | 'next48hours' | 'all';
  handleExperienceClick: (experience: Experience) => void;
  selectedInterests: string[];
  setSelectedInterests: (interests: string[]) => void;
  updatePersonalizedExperiences: (interests: string[], location: string) => void;
  clearAllFilters: () => void;
}

const TabsWrapper = ({
  activeTab,
  setActiveTab,
  filteredExperiences,
  personalizedExperiences,
  trendingExperiences,
  hiddenGemExperiences,
  flashDealExperiences,
  currentLocation,
  timeFrame,
  handleExperienceClick,
  selectedInterests,
  setSelectedInterests,
  updatePersonalizedExperiences,
  clearAllFilters
}: TabsWrapperProps) => {
  return (
    <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="mb-8">
      <TabsList className="w-full justify-start overflow-x-auto">
        <TabsTrigger value="all">All Events</TabsTrigger>
        <TabsTrigger value="personalized" className="flex items-center gap-1">
          <Sparkles size={14} />
          For You
        </TabsTrigger>
        <TabsTrigger value="trending" className="flex items-center gap-1">
          <Sparkles size={14} />
          Trending
        </TabsTrigger>
        <TabsTrigger value="hidden-gems" className="flex items-center gap-1">
          <Gem size={14} />
          Hidden Gems
        </TabsTrigger>
        <TabsTrigger value="flash-deals" className="flex items-center gap-1">
          <Zap size={14} />
          Flash Deals
        </TabsTrigger>
      </TabsList>
    
      <div className="mb-6 mt-4">
        <h1 className="text-2xl font-bold mb-2">
          {activeTab === 'all' && 'Explore Events'}
          {activeTab === 'personalized' && 'Recommended For You'}
          {activeTab === 'trending' && 'Trending Events'}
          {activeTab === 'hidden-gems' && 'Hidden Gems'}
          {activeTab === 'flash-deals' && 'Flash Deals'}
        </h1>
        <p className="text-muted-foreground">
          {activeTab === 'all' && `${filteredExperiences.length} events in ${currentLocation}`}
          {activeTab === 'personalized' && `${personalizedExperiences.length} events tailored to your interests`}
          {activeTab === 'trending' && `${trendingExperiences.length} events everyone's talking about`}
          {activeTab === 'hidden-gems' && `${hiddenGemExperiences.length} unique experiences you might have missed`}
          {activeTab === 'flash-deals' && `${flashDealExperiences.length} limited-time deals available now`}
          {timeFrame === 'today' && ' happening today'}
          {timeFrame === 'next48hours' && ' in the next 48 hours'}
        </p>
      </div>
    
      <TabsContent value="all">
        <ExperienceList 
          experiences={filteredExperiences}

          handleExperienceClick={handleExperienceClick}
          activeTab={activeTab}
          clearFilters={clearAllFilters}
        />
      </TabsContent>
      
      <TabsContent value="personalized">
        {personalizedExperiences.length > 0 ? (
          <ExperienceList 
            experiences={personalizedExperiences} 
            handleExperienceClick={handleExperienceClick}
            activeTab={activeTab}
            clearFilters={clearAllFilters}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4">
              <Sparkles className="h-6 w-6 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">Tell us what you like</h3>
            <p className="text-muted-foreground text-center max-w-md mb-6">
              Select some interests to help us personalize your experience recommendations.
            </p>
            <div className="w-full max-w-2xl">
              <InterestSelection
                selectedInterests={selectedInterests}
                onChange={(interests) => {
                  setSelectedInterests(interests);
                  updatePersonalizedExperiences(interests, currentLocation);
                }}
              />
            </div>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="trending">
        {trendingExperiences.length > 0 ? (
          <ExperienceList 
            experiences={trendingExperiences} 
            handleExperienceClick={handleExperienceClick} 
            activeTab={activeTab}
            clearFilters={clearAllFilters}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center">
              No trending events available at the moment. Check back soon!
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="hidden-gems">
        {hiddenGemExperiences.length > 0 ? (
          <ExperienceList 
            experiences={hiddenGemExperiences} 
            handleExperienceClick={handleExperienceClick} 
            activeTab={activeTab}
            clearFilters={clearAllFilters}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center">
              No hidden gem events available at the moment. Check back soon!
            </p>
          </div>
        )}
      </TabsContent>
      
      <TabsContent value="flash-deals">
        {flashDealExperiences.length > 0 ? (
          <ExperienceList 
            experiences={flashDealExperiences} 
            handleExperienceClick={handleExperienceClick} 
            activeTab={activeTab}
            clearFilters={clearAllFilters}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-16">
            <p className="text-muted-foreground text-center">
              No flash deals available at the moment. Check back soon!
            </p>
          </div>
        )}
      </TabsContent>
    </Tabs>
  );
};

export default TabsWrapper;
