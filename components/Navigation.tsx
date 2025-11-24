import React from 'react';
import { Home, Plus, Heart, User } from 'lucide-react';

interface NavigationProps {
  currentView: string;
  setView: (view: string) => void;
  isAdmin: boolean;
}

const Navigation: React.FC<NavigationProps> = ({ currentView, setView, isAdmin }) => {
  const navItems = [
    { id: 'home', label: 'Recipes', icon: <Home size={22} /> },
    ...(isAdmin ? [{ id: 'admin', label: 'Create', icon: <Plus size={24} /> }] : []),
    { id: 'favorites', label: 'Saved', icon: <Heart size={22} /> },
    ...(!isAdmin ? [{ id: 'login', label: 'Login', icon: <User size={22} /> }] : []),
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center px-4 pointer-events-none">
      <nav className="bg-gray-900/95 backdrop-blur-xl text-white rounded-full shadow-2xl h-16 flex items-center justify-around px-6 w-full max-w-sm pointer-events-auto border border-white/10">
        {navItems.map((item) => {
           const isActive = currentView === item.id;
           return (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`flex flex-col items-center justify-center w-full h-full transition-colors duration-300 ${
                isActive ? 'text-brand-500' : 'text-gray-400'
              }`}
            >
              <div className={`transition-transform duration-200 ${isActive ? 'scale-110' : ''}`}>
                {item.icon}
              </div>
            </button>
          );
        })}
      </nav>
    </div>
  );
};

export default Navigation;