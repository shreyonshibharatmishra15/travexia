
import { Experience } from '@/lib/data';
import { ViatorExperience } from './viatorApi';
import { GetYourGuideExperience } from './getYourGuideApi';
import { FeverExperience } from './feverApi';

// Helper function to generate random ID
const generateId = (): string => {
  return Math.random().toString(36).substring(2, 15);
};

// Viator adapter
export function adaptViatorExperiences(viatorExps: ViatorExperience[]): Experience[] {
  return viatorExps.map(exp => {
    const startDate = new Date(exp.startDate).toISOString();
    const endDate = new Date(exp.endDate).toISOString();
    
    return {
      id: `viator-${exp.id || generateId()}`,
      title: exp.title,
      description: exp.description,
      image: exp.imageUrl,
      price: exp.price.amount,
      duration: `${exp.duration.fixedDuration.duration} ${exp.duration.fixedDuration.unit}`,
      location: exp.location.name,
      city: exp.location.cityName,
      region: exp.location.regionName,
      country: exp.location.countryName,
      coordinates: exp.location.coordinates ? {
        lat: exp.location.coordinates.latitude,
        lng: exp.location.coordinates.longitude
      } : undefined,
      rating: exp.reviewStats?.averageRating || 4.5,
      reviewCount: exp.reviewStats?.totalReviews || 0,
      categories: exp.categories,
      provider: exp.supplierName,
      availableTimes: exp.availableTimes,
      startDate,
      endDate,
      trending: exp.isBestSeller,
      hiddenGem: exp.isLowAvailability,
      source: 'viator'
    };
  });
}

// GetYourGuide adapter
export function adaptGetYourGuideExperiences(gygExps: GetYourGuideExperience[]): Experience[] {
  return gygExps.map(exp => {
    return {
      id: `gyg-${exp.id || generateId()}`,
      title: exp.title,
      description: exp.description,
      image: exp.imageUrl,
      price: exp.price.current,
      duration: exp.duration,
      location: exp.location,
      city: exp.city,
      region: exp.region,
      country: exp.country,
      coordinates: exp.coordinates,
      rating: exp.rating,
      reviewCount: exp.reviewCount,
      categories: exp.categories,
      provider: exp.provider,
      availableTimes: exp.availableTimes,
      startDate: exp.availableFrom,
      endDate: exp.availableTo,
      trending: exp.isBestseller,
      hiddenGem: exp.isHiddenGem,
      flashDeal: exp.discount ? true : false,
      flashDealEndTime: exp.discount?.validUntil,
      discountPercentage: exp.discount?.percentage,
      soldOut: exp.isSoldOut,
      source: 'getyourguide'
    };
  });
}

// Fever adapter
export function adaptFeverExperiences(feverExps: FeverExperience[]): Experience[] {
  return feverExps.map(exp => {
    const durationText = `${exp.duration.value} ${exp.duration.unit}`;
    const firstSession = exp.sessions[0] || { startTime: new Date().toISOString(), endTime: new Date().toISOString() };
    
    return {
      id: `fever-${exp.id || generateId()}`,
      title: exp.name,
      description: exp.description,
      image: exp.media.images[0] || '',
      price: exp.price.value,
      duration: durationText,
      location: exp.venue.name,
      city: exp.venue.city,
      region: exp.venue.region,
      country: exp.venue.country,
      coordinates: exp.venue.location ? {
        lat: exp.venue.location.latitude,
        lng: exp.venue.location.longitude
      } : undefined,
      rating: exp.reviews.average,
      reviewCount: exp.reviews.count,
      categories: exp.tags,
      provider: exp.organizer,
      availableTimes: exp.sessions.map(s => {
        const date = new Date(s.startTime);
        return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')} ${date.getHours() >= 12 ? 'PM' : 'AM'}`;
      }),
      startDate: firstSession.startTime,
      endDate: firstSession.endTime,
      trending: exp.trending,
      hiddenGem: exp.highlighted,
      flashDeal: exp.flash ? true : false,
      flashDealEndTime: exp.flash?.endsAt,
      discountPercentage: exp.flash?.discount,
      soldOut: exp.soldOut,
      languages: exp.languages,
      source: 'fever'
    };
  });
}
