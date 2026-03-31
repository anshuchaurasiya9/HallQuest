
import { Category, City, Property, Amenity, CreatePropertyRequest } from '../types';

const API_BASE_URL = 'https://bookmyfunctionhall.spryzen.in/api/v1';

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  data: T;
}

export interface PaginatedResponse<T> {
  current_page: number;
  data: T[];
  first_page_url: string;
  from: number;
  last_page: number;
  last_page_url: string;
  links: {
    url: string | null;
    label: string;
    page: number | null;
    active: boolean;
  }[];
  next_page_url: string | null;
  path: string;
  per_page: number;
  prev_page_url: string | null;
  to: number;
  total: number;
}

export const fetchCategories = async (): Promise<ApiResponse<Category[]>> => {
  const response = await fetch(`${API_BASE_URL}/categories`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch categories');
  }

  return response.json();
};

export const fetchCities = async (): Promise<ApiResponse<City[]>> => {
  const response = await fetch(`${API_BASE_URL}/cities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch cities');
  }

  return response.json();
};

export const fetchProperties = async (page: number = 1): Promise<PaginatedResponse<Property>> => {
  const response = await fetch(`${API_BASE_URL}/properties?page=${page}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch properties');
  }

  return response.json();
};

export const fetchAmenities = async (): Promise<ApiResponse<Amenity[]>> => {
  const response = await fetch(`${API_BASE_URL}/amenities`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
    },
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to fetch amenities');
  }

  return response.json();
};

export const createProperty = async (data: CreatePropertyRequest, token: string): Promise<ApiResponse<Property>> => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('city_id', String(data.city_id));
  formData.append('category_id', String(data.category_id));
  formData.append('contact_number', data.contact_number);
  formData.append('guest_capacity', String(data.guest_capacity));
  formData.append('price', String(data.price));
  formData.append('pan_number', data.pan_number);
  formData.append('gst_number', data.gst_number);
  formData.append('latitude', String(data.latitude));
  formData.append('longitude', String(data.longitude));
  formData.append('owner_id', String(data.owner_id));

  if (data.images) {
    data.images.forEach((image) => {
      formData.append('images[]', image);
    });
  }

  if (data.videos) {
    data.videos.forEach((video) => {
      formData.append('videos[]', video);
    });
  }

  const response = await fetch(`${API_BASE_URL}/property`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Accept': 'application/json',
    },
    body: formData,
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(errorData.message || 'Failed to create property');
  }

  return response.json();
};
