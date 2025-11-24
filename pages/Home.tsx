import React, { useState, useMemo } from 'react';
import { Recipe, RecipeCategory } from '../types';
import RecipeCard from '../components/RecipeCard';
import AdUnit from '../components/AdUnit';

interface HomeProps {
  recipes: Recipe[];
  onRecipeClick: (recipe: Recipe) => void;
}

const Home: React.FC<HomeProps> = ({ recipes, onRecipeClick }) => {
  const [activeTab, setActiveTab] = useState<RecipeCategory>(RecipeCategory.BREAKFAST);

  const filteredRecipes = useMemo(() => {
    return recipes.filter(r => r.category === activeTab);
  }, [recipes, activeTab]);

  return (
    <div className="pb-32 min-h-screen">
      <header className="bg-white/90 backdrop-blur-md pt-12 pb-2 px-6 sticky top-0 z-40 border-b border-gray-100">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-3xl font-serif font-black text-gray-900 tracking-tight">
            Chef<span className="text-brand-600">Pocket</span>
          </h1>
        </div>
        
        <div className="flex space-x-2 overflow-x-auto no-scrollbar pb-3">
          {Object.values(RecipeCategory).map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-bold transition-all duration-300 ${
                activeTab === cat
                  ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                  : 'bg-gray-100 text-gray-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </header>

      <div className="px-5 pt-6">
        <AdUnit slotId="home-top" className="mb-6 rounded-xl" />
        
        <div className="space-y-2 animate-fade-in">
          {filteredRecipes.map((recipe, idx) => (
            <div key={recipe.id} className="animate-slide-up" style={{ animationDelay: `${idx * 0.1}s` }}>
              <RecipeCard recipe={recipe} onClick={onRecipeClick} />
            </div>
          ))}
        </div>

        {filteredRecipes.length === 0 && (
           <div className="text-center py-20 text-gray-400">No recipes found.</div>
        )}
      </div>
    </div>
  );
};

export default Home;