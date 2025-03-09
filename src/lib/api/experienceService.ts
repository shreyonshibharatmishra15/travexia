
import { Experience } from '@/lib/data';
import { fetchViatorExperiences } from './viatorApi';
import { fetchGetYourGuideExperiences } from './getYourGuideApi';
import { fetchFeverExperiences } from './feverApi';
import { 
  adaptViatorExperiences, 
  adaptGetYourGuideExperiences, 
  adaptFeverExperiences 
} from './experienceAdapter';
import { toast } from 'sonner';

// Function to fetch experiences from all sources
export async function fetchAllExperiences(location: string): Promise<Experience[]> {
  toast.info("Fetching experiences from external APIs", {
    description: `Looking for events in ${location}...`
  });
  
  try {
    // Fetch from all sources in parallel
    const [viatorData, gygData, feverData] = await Promise.all([
      fetchViatorExperiences(location).catch(err => {
        console.error('Error fetching from Viator:', err);
        return [];
      }),
      fetchGetYourGuideExperiences(location).catch(err => {
        console.error('Error fetching from GetYourGuide:', err);
        return [];
      }),
      fetchFeverExperiences(location).catch(err => {
        console.error('Error fetching from Fever:', err);
        return [];
      })
    ]);
    
    // Adapt all data to our Experience type
    const viatorExperiences = adaptViatorExperiences(viatorData);
    const gygExperiences = adaptGetYourGuideExperiences(gygData);
    const feverExperiences = adaptFeverExperiences(feverData);
    
    // Combine all experiences
    const allExperiences = [
      ...viatorExperiences,
      ...gygExperiences,
      ...feverExperiences
    ];
    
    if (allExperiences.length === 0) {
      toast.info("No new experiences found", {
        description: "Using existing data for now"
      });
    } else {
      toast.success("New experiences loaded", {
        description: `Found ${allExperiences.length} events from external providers`
      });
    }
    
    return allExperiences;
  } catch (error) {
    console.error('Error fetching experiences:', error);
    toast.error("Error loading experiences", {
      description: "Could not fetch from external APIs"
    });
    return [];
  }
}
