import React from 'react';
import { Clock, ChevronRight } from 'lucide-react';
import { Recipe } from '../types';

interface RecipeCardProps {
  recipe: Recipe;
  onClick: (recipe: Recipe) => void;
}

const RecipeCard: React.FC<RecipeCardProps> = ({ recipe, onClick }) => {
  return (
    <div 
      onClick={() => onClick(recipe)}
      className="group relative w-full aspect-[4/3] rounded-3xl overflow-hidden mb-6 shadow-lg bg-gray-200 cursor-pointer"
    >
      <img 
        src={recipe.imageUrl || "https://picsum.photos/600/400"} 
        alt={recipe.title} 
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>

      <div className="absolute top-3 left-3">
        <span className="bg-black/30 backdrop-blur-md text-white text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-full border border-white/20">
          {recipe.category}
        </span>
      </div>

      <div className="absolute bottom-0 left-0 right-0 p-5 text-white">
        <h3 className="font-serif text-2xl font-bold leading-tight mb-1 text-white shadow-black drop-shadow-sm">
          {recipe.title}
        </h3>
        <div className="flex items-center text-xs text-gray-300 mb-2">
            <Clock size={12} className="mr-1 text-brand-500" />
            {recipe.prepTime}
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;