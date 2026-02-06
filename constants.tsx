
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
    images: [
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Valet Parking', 'Catering', 'AC', 'WiFi', 'Stage'],
    description: 'A luxurious ballroom perfect for high-end weddings and corporate galas. Featuring state-of-the-art acoustics and golden chandeliers.',
    category: 'Wedding',
    services: [
      { name: 'Gourmet Catering', description: 'Customizable menus featuring international cuisines.', price: 'Starts at $45/plate' },
      { name: 'Floral Decoration', description: 'Exotic floral arrangements tailored to your theme.', price: 'Custom Quote' },
      { name: 'Audio-Visual', description: 'Full PA system with wireless mics and projectors.' }
    ],
    reviews: [
      { userName: 'Sarah Jenkins', rating: 5, comment: 'Absolutely stunning venue! The staff was incredibly helpful throughout our wedding.', date: 'Oct 2024' },
      { userName: 'Michael Ross', rating: 4, comment: 'Great acoustics for our corporate summit. Highly recommended.', date: 'Dec 2024' }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1469334031218-e382a71b716b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1505236858219-8359eb29e329?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Outdoor Seating', 'Live Music', 'Poolside', 'Bar'],
    description: 'Beautiful garden-themed outdoor venue. Ideal for birthday parties, anniversaries, and intimate evening celebrations.',
    category: 'Party',
    services: [
      { name: 'Live DJ', description: 'Professional DJ with a wide range of genres.', price: '$500/evening' },
      { name: 'Bar Service', description: 'Skilled mixologists and premium liquor selection.', price: 'Based on consumption' }
    ],
    reviews: [
      { userName: 'David L.', rating: 5, comment: 'The ambiance at night is magical. Best birthday party ever!', date: 'Nov 2024' }
    ]
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
    images: [
      'https://images.unsplash.com/photo-1431540015161-0bf868a2d407?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Projectors', 'Conference Rooms', 'High Speed Internet', 'Buffet'],
    description: 'Modern, sleek, and highly functional. Designed specifically for product launches and corporate summits.',
    category: 'Corporate',
    services: [
      { name: 'Technical Support', description: 'On-site IT staff available throughout your event.' },
      { name: 'Business Catering', description: 'Quick-serve buffet and coffee stations for professionals.' }
    ],
    reviews: [
      { userName: 'Tech Solutions Inc.', rating: 5, comment: 'Perfect for our Q4 town hall. Internet was rock solid.', date: 'Jan 2025' }
    ]
  },
  {
    id: '4',
    name: 'Starlight Terrace Rooftop',
    location: 'Skyline Heights',
    distance: '2.1 km',
    rating: 4.7,
    reviewCount: 210,
    priceRange: '$$$',
    capacity: '150-400 Guests',
    images: [
      'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1560624052-449f5ddf0c31?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['City View', 'Open Bar', 'DJ Booth', 'Heaters'],
    description: 'Breathtaking panoramic views of the city. The Starlight Terrace offers an unmatched atmosphere for evening cocktail parties and elite celebrations.',
    category: 'Party',
    services: [
      { name: 'Rooftop Bar', description: 'Premium cocktails with a view.' },
      { name: 'Atmospheric Lighting', description: 'Color-changing LED setups for every mood.' }
    ],
    reviews: []
  },
  {
    id: '5',
    name: 'The Grand Atrium',
    location: 'Central Plaza',
    distance: '0.5 km',
    rating: 4.9,
    reviewCount: 342,
    priceRange: '$$$$',
    capacity: '800-2000 Guests',
    images: [
      'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?auto=format&fit=crop&q=80&w=1200',
      'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=1200'
    ],
    amenities: ['Glass Roof', 'Full Stage', 'Professional Lighting', 'Bridal Suite'],
    description: 'An architectural masterpiece with a soaring glass ceiling. The Grand Atrium is the city\'s most sought-after location for grand weddings.',
    category: 'Wedding',
    services: [
      { name: 'Full-Service Planning', description: 'Dedicated coordinator to handle every detail.' },
      { name: 'Valet & Security', description: 'Professional staff for large-scale events.' }
    ],
    reviews: [
      { userName: 'Emily W.', rating: 5, comment: 'The lighting here is just gorgeous. Our wedding photos turned out like a fairy tale.', date: 'Nov 2024' }
    ]
  }
];

export const CATEGORIES = [
  { id: '1', name: 'Wedding', icon: '💍' },
  { id: '2', name: 'Party', icon: '🎉' },
  { id: '3', name: 'Corporate', icon: '💼' },
  { id: '4', name: 'Birthday', icon: '🎂' },
  { id: '5', name: 'Seminar', icon: '🎓' }
];
