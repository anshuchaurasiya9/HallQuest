
import React, { useState, useEffect } from 'react';
import { AppState, Hall, User } from './types';
import { MOCK_HALLS } from './constants';

// Internal Screens
import SplashScreen from './features/SplashScreen';
import OnboardingScreen from './features/OnboardingScreen';
import AuthScreen from './features/AuthScreen';
import HomeScreen from './features/HomeScreen';
import DetailScreen from './features/DetailScreen';
import ProfileScreen from './features/ProfileScreen';

const App: React.FC = () => {
  const [currentScreen, setCurrentScreen] = useState<AppState>(AppState.SPLASH);
  const [user, setUser] = useState<User | null>(null);
  const [selectedHall, setSelectedHall] = useState<Hall | null>(null);

  // Simulation of App Lifecycle
  useEffect(() => {
    if (currentScreen === AppState.SPLASH) {
      setTimeout(() => {
        const hasSeenOnboarding = localStorage.getItem('onboarding_seen');
        if (hasSeenOnboarding) {
          const storedUser = localStorage.getItem('user_session');
          if (storedUser) {
            setUser(JSON.parse(storedUser));
            setCurrentScreen(AppState.HOME);
          } else {
            setCurrentScreen(AppState.AUTH);
          }
        } else {
          setCurrentScreen(AppState.ONBOARDING);
        }
      }, 2500);
    }
  }, [currentScreen]);

  const handleOnboardingComplete = () => {
    localStorage.setItem('onboarding_seen', 'true');
    setCurrentScreen(AppState.AUTH);
  };

  const handleLoginSuccess = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user_session', JSON.stringify(userData));
    setCurrentScreen(AppState.HOME);
  };

  const handleHallSelect = (hall: Hall) => {
    setSelectedHall(hall);
    setCurrentScreen(AppState.DETAIL);
  };

  const handleLogout = () => {
    localStorage.removeItem('user_session');
    setUser(null);
    setCurrentScreen(AppState.AUTH);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case AppState.SPLASH:
        return <SplashScreen />;
      case AppState.ONBOARDING:
        return <OnboardingScreen onComplete={handleOnboardingComplete} />;
      case AppState.AUTH:
        return <AuthScreen onLoginSuccess={handleLoginSuccess} />;
      case AppState.HOME:
        return <HomeScreen onSelectHall={handleHallSelect} onOpenProfile={() => setCurrentScreen(AppState.PROFILE)} />;
      case AppState.DETAIL:
        return selectedHall ? (
          <DetailScreen hall={selectedHall} onBack={() => setCurrentScreen(AppState.HOME)} />
        ) : null;
      case AppState.PROFILE:
        return <ProfileScreen user={user} onBack={() => setCurrentScreen(AppState.HOME)} onLogout={handleLogout} />;
      default:
        return <HomeScreen onSelectHall={handleHallSelect} onOpenProfile={() => setCurrentScreen(AppState.PROFILE)} />;
    }
  };

  return (
    <div className="max-w-md mx-auto min-h-screen bg-slate-50 relative overflow-hidden shadow-2xl flex flex-col">
      {renderScreen()}
    </div>
  );
};

export default App;
