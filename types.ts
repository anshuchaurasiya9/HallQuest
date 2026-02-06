
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

export interface Service {
  name: string;
  description: string;
  price?: string;
}

export interface Review {
  userName: string;
  rating: number;
  comment: string;
  date: string;
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
  services: Service[];
  reviews: Review[];
}

export interface EnquiryRequest {
  hallId: string;
  name: string;
  phone: string;
  eventDate: string;
  guestCount: number;
  message: string;
}
