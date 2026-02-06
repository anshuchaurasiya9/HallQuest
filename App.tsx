
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
  const [intendedAction, setIntendedAction] = useState<{ type: string; hall: Hall } | null>(null);

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
      setSelectedHall(intendedAction.hall);
      setCurrentScreen(AppState.DETAIL);
      setIntendedAction(null);
    } else {
      setCurrentScreen(AppState.HOME);
    }
  };

  const handleHallSelect = (hall: Hall) => {
    setSelectedHall(hall);
    setCurrentScreen(AppState.DETAIL);
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
        return <ProfileScreen user={user} onBack={() => setCurrentScreen(AppState.HOME)} onLogout={handleLogout} />;
      default:
        return <HomeScreen 
          user={user}
          onSelectHall={handleHallSelect} 
          onOpenProfile={() => setCurrentScreen(AppState.PROFILE)} 
          onLoginClick={() => setCurrentScreen(AppState.AUTH)}
        />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 relative overflow-x-hidden flex flex-col items-center">
      <div className="w-full max-w-7xl min-h-screen bg-white shadow-xl flex flex-col overflow-hidden">
        {renderScreen()}
      </div>
    </div>
  );
};

export default App;
