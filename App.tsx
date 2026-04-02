
import React, { useState, useEffect } from 'react';
import { fetchPropertyDetails, fetchCities, fetchCategories, fetchAmenities } from './services/venueService';
import { AppState, Hall, User, Property, City, Category, Amenity } from './types';
import { MOCK_HALLS } from './constants';

// Internal Screens
import SplashScreen from './features/SplashScreen';
import OnboardingScreen from './features/OnboardingScreen';
import AuthScreen from './features/AuthScreen';
import HomeScreen from './features/HomeScreen';
import DetailScreen from './features/DetailScreen';
import ProfileScreen from './features/ProfileScreen';
import ServicesScreen from './features/ServicesScreen';
import ListYourVenueScreen from './features/ListYourVenueScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.SPLASH);
  const [user, setUser] = useState<User | null>(null);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);
  const [cities, setCities] = useState<City[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [amenities, setAmenities] = useState<Amenity[]>([]);
  const [intendedAction, setIntendedAction] = useState<{ type: 'enquiry' | 'list_venue'; hall?: Hall } | null>(null);

  useEffect(() => {
    // Restore session if exists
    const storedUser = localStorage.getItem('user_session');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }

    if (currentScreen === AppState.SPLASH) {
      setTimeout(() => {
        const hasSeenOnboarding = localStorage.getItem('onboarding_seen');
        if (hasSeenOnboarding) {
          setCurrentScreen(AppState.HOME);
        } else {
          setCurrentScreen(AppState.ONBOARDING);
        }
      }, 2500);
    }
  }, [currentScreen]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_seen', 'true');
    setCurrentScreen(AppState.HOME);
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
    if (intendedAction) {
      if (intendedAction.type === 'enquiry' && intendedAction.hall) {
        setSelectedHall(intendedAction.hall);
        setCurrentScreen(AppState.DETAIL);
      } else if (intendedAction.type === 'list_venue') {
        setCurrentScreen(AppState.LIST_VENUE);
      }
      setIntendedAction(null);
    } else {
      setCurrentScreen(AppState.HOME);
    }
  };

  useEffect(() => {
    const loadBaseData = async () => {
      try {
        const [citiesRes, categoriesRes, amenitiesRes] = await Promise.all([
          fetchCities(),
          fetchCategories(),
          fetchAmenities()
        ]);
        if (citiesRes.success) setCities(citiesRes.data);
        if (categoriesRes.success) setCategories(categoriesRes.data);
        if (amenitiesRes.success) setAmenities(amenitiesRes.data);
      } catch (error) {
        console.error('Error loading base data:', error);
      }
    };
    loadBaseData();
  }, []);

  const mapPropertyToHall = (property: Property, citiesList: City[], categoriesList: Category[], amenitiesList: Amenity[]): Hall => {
    const city = citiesList.find(c => c.id === property.city_id);
    const category = categoriesList.find(cat => cat.id === property.category_id);
    
    return {
      id: property.id,
      name: property.title,
      location: city ? city.name : 'Unknown Location',
      capacity: `${property.guest_capacity} Guests`,
      price: parseFloat(property.price),
      rating: 4.5,
      images: property.media.filter(m => m.type === 'image').map(m => m.file_url).length > 0
        ? property.media.filter(m => m.type === 'image').map(m => m.file_url)
        : ['https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&q=80&w=800'],
      category: category ? category.name : 'Venue',
      description: property.description || 'A premium function hall for your special events.',
      amenities: property.amenities.map((am: any) => typeof am === 'string' ? am : (am.name || 'Amenity')),
      amenityDetails: property.amenities.map((am: any) => {
        const amenityId = typeof am === 'object' ? am.id : null;
        const amenityName = typeof am === 'string' ? am : am.name;
        return amenitiesList.find(a => (amenityId && a.id === amenityId) || a.name === amenityName) || (typeof am === 'object' ? am : { name: am } as Amenity);
      }),
      reviewCount: property.favorite_count || 0,
      priceRange: `₹${property.price}`,
      services: [],
      reviews: (property as any).reviews?.map((r: any) => ({
        userName: r.user?.name || 'User',
        rating: r.rating,
        comment: r.comment,
        date: new Date(r.created_at).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
      })) || [],
      distance: '0.5 km'
    };
  };

  const handleHallSelect = async (hall: Hall) => {
    setSelectedHall(hall);
    setCurrentScreen(AppState.DETAIL);
    
    // Fetch full details in background to update reviews etc.
    try {
      const detailsRes = await fetchPropertyDetails(hall.id);
      if (detailsRes.success) {
        const fullHall = mapPropertyToHall(detailsRes.data, cities, categories, amenities);
        setSelectedHall(fullHall);
      }
    } catch (error) {
      console.error('Error fetching property details:', error);
    }
  };

  const handleEnquiryAuthTrigger = (hall: Hall) => {
    setIntendedAction({ type: 'enquiry', hall });
    setCurrentScreen(AppState.AUTH);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUser(null);
    setCurrentScreen(AppState.HOME);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppState.SPLASH:
        return <SplashScreen />;
      case AppState.ONBOARDING:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case AppState.AUTH:
        return <AuthScreen onLoginSuccess={handleLoginSuccess} onBack={() => setCurrentScreen(AppState.HOME)} />;
      case AppState.HOME:
        return (
          <HomeScreen 
            user={user}
            onSelectHall={handleHallSelect} 
            onOpenProfile={() => setCurrentScreen(AppState.PROFILE)} 
            onLoginClick={() => setCurrentScreen(AppState.AUTH)}
            onServicesClick={() => setCurrentScreen(AppState.SERVICES)}
            onListVenueClick={() => {
              if (user) {
                setCurrentScreen(AppState.LIST_VENUE);
              } else {
                setIntendedAction({ type: 'list_venue' });
                setCurrentScreen(AppState.AUTH);
              }
            }}
          />
        );
      case AppState.SERVICES:
        return <ServicesScreen onBack={() => setCurrentScreen(AppState.HOME)} />;
      case AppState.LIST_VENUE:
        return user ? (
          <ListYourVenueScreen 
            user={user} 
            onBack={() => setCurrentScreen(AppState.HOME)} 
            onSuccess={() => setCurrentScreen(AppState.HOME)} 
          />
        ) : (
          <AuthScreen 
            onLoginSuccess={handleLoginSuccess} 
            onBack={() => setCurrentScreen(AppState.HOME)} 
          />
        );
      case AppState.DETAIL:
        return selectedHall ? (
          <DetailScreen 
            hall={selectedHall} 
            user={user}
            onBack={() => setCurrentScreen(AppState.HOME)} 
            onAuthRequired={() => handleEnquiryAuthTrigger(selectedHall)}
          />
        ) : null;
      case AppState.PROFILE:
        return <ProfileScreen user={user} onBack={() => setCurrentScreen(AppState.HOME)} onLogout={handleLogout} onSelectHall={handleHallSelect} />;
      default:
        return <HomeScreen 
          user={user}
          onSelectHall={handleHallSelect} 
          onOpenProfile={() => setCurrentScreen(AppState.PROFILE)} 
          onLoginClick={() => setCurrentScreen(AppState.AUTH)}
          onServicesClick={() => setCurrentScreen(AppState.SERVICES)}
          onListVenueClick={() => setCurrentScreen(AppState.LIST_VENUE)}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-white relative overflow-x-hidden flex flex-col">
      <div className="w-full flex-1 flex flex-col">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
