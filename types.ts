
export enum AppState {
  SPLASH = 'SPLASH',
  ONBOARDING = 'ONBOARDING',
  AUTH = 'AUTH',
  HOME = 'HOME',
  RESULTS = 'RESULTS',
  DETAIL = 'DETAIL',
  PROFILE = 'PROFILE',
  SERVICES = 'SERVICES',
  LIST_VENUE = 'LIST_VENUE'
}

export interface User {
  id: number | string;
  name: string;
  email: string;
  email_verified_at?: string | null;
  role?: string;
  phone?: string | null;
  deleted_at?: string | null;
  token: string;
  updated_at?: string;
  created_at?: string;
}

export interface Service {
  name: string;
  description: string;
  price?: string;
  icon?: string;
}

export interface Review {
  id?: number;
  user_id?: number;
  property_id?: number;
  userName?: string;
  rating: number;
  comment: string;
  date?: string;
  created_at?: string;
  updated_at?: string;
  user?: {
    name: string;
  };
}

export interface Amenity {
  id: number;
  name: string;
  icon: string;
  created_at: string;
  updated_at: string;
  icon_url: string;
}

export interface PropertyMedia {
  id: number;
  property_id: number;
  file_path: string;
  type: 'image' | 'video';
  created_at: string;
  updated_at: string;
  file_url: string;
}

export interface Property {
  id: number;
  user_id: number;
  city_id: number;
  category_id: number;
  title: string;
  description: string | null;
  contact_number: string;
  guest_capacity: number;
  owner_id: number;
  manager_id: number;
  latitude: string;
  longitude: string;
  rejection_reason: string | null;
  reviewed_by: number | null;
  reviewed_at: string | null;
  price: string;
  pan_number: string;
  gst_number: string;
  status: string;
  is_active: number;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
  is_favorite: number;
  favorite_count: number;
  media: PropertyMedia[];
  amenities: any[];
}

export interface Hall {
  id: number | string;
  name: string;
  location: string;
  distance: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  capacity: string;
  images: string[];
  amenities: string[];
  amenityDetails?: Amenity[];
  description: string;
  category: string;
  services: Service[];
  reviews: Review[];
  price?: number;
}

export interface Category {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface City {
  id: number;
  name: string;
  created_at: string;
  updated_at: string;
}

export interface EnquiryRequest {
  property_id: number | string;
  name: string;
  phone: string;
  event_date: string;
  event_type: string;
}

export interface ReviewRequest {
  property_id: number | string;
  rating: number;
  comment: string;
}

export interface PropertyFilterParams {
  search?: string;
  city_id?: number | string;
  category_id?: number | string;
  min_price?: number | string;
  max_price?: number | string;
  min_capacity?: number | string;
  max_capacity?: number | string;
  amenities?: (number | string)[];
  page?: number;
}

export interface CreatePropertyRequest {
  title: string;
  city_id: number | string;
  category_id: number | string;
  contact_number: string;
  guest_capacity: number | string;
  price: number | string;
  pan_number: string;
  gst_number: string;
  latitude: number | string;
  longitude: number | string;
  owner_id: number | string;
  images?: File[];
  videos?: File[];
}
