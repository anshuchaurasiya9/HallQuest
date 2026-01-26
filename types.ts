
export enum AppState {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  HOME = 'HOME',
  RESULTS = 'RESULTS',
  DETAIL = 'DETAIL',
  PROFILE = 'PROFILE'
}

export interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

export interface Amenity {
  id: string;
  name: string;
  icon: string;
}

export interface Hall {
  id: string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  capacity: string;
  images: string[];
  amenities: string[];
  description: string;
  category: string;
}

export interface EnquiryRequest {
  hallId: string;
  name: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  message: string;
}
