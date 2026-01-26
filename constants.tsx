
import { Hall } from './types';

export const MOCK_HALLS: Hall[] = [
  {
    id: '1',
    name: 'Royal Regency Grand Ballroom',
    location: 'Downtown, Metropolitan City',
    distance: '1.2 km',
    rating: 4.8,
    reviewCount: 124,
    priceRange: '$$$',
    capacity: '500-1200 Guests',
    images: ['https://picsum.photos/seed/hall1/800/600', 'https://picsum.photos/seed/hall1-2/800/600'],
    amenities: ['Valet Parking', 'Catering', 'AC', 'WiFi', 'Stage'],
    description: 'A luxurious ballroom perfect for high-end weddings and corporate galas. Featuring state-of-the-art acoustics and golden chandeliers.',
    category: 'Wedding'
  },
  {
    id: '2',
    name: 'Gardenia Open Air Lounge',
    location: 'Emerald Hills',
    distance: '3.5 km',
    rating: 4.5,
    reviewCount: 89,
    priceRange: '$$',
    capacity: '100-300 Guests',
    images: ['https://picsum.photos/seed/hall2/800/600', 'https://picsum.photos/seed/hall2-2/800/600'],
    amenities: ['Outdoor Seating', 'Live Music', 'Poolside', 'Bar'],
    description: 'Beautiful garden-themed outdoor venue. Ideal for birthday parties, anniversaries, and intimate evening celebrations.',
    category: 'Party'
  },
  {
    id: '3',
    name: 'The Corporate Nexus',
    location: 'Tech Park East',
    distance: '0.8 km',
    rating: 4.9,
    reviewCount: 56,
    priceRange: '$$$$',
    capacity: '50-500 Guests',
    images: ['https://picsum.photos/seed/hall3/800/600', 'https://picsum.photos/seed/hall3-2/800/600'],
    amenities: ['Projectors', 'Conference Rooms', 'High Speed Internet', 'Buffet'],
    description: 'Modern, sleek, and highly functional. Designed specifically for product launches and corporate summits.',
    category: 'Corporate'
  }
];

export const CATEGORIES = [
  { id: '1', name: 'Wedding', icon: '💍' },
  { id: '2', name: 'Party', icon: '🎉' },
  { id: '3', name: 'Corporate', icon: '💼' },
  { id: '4', name: 'Birthday', icon: '🎂' },
  { id: '5', name: 'Seminar', icon: '🎓' }
];
