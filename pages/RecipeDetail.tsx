import React from 'react';
import { ArrowLeft, Clock, Share2, ChefHat } from 'lucide-react';
import { Recipe } from '../types';
import AdUnit from '../components/AdUnit';

interface RecipeDetailProps {
  recipe: Recipe;
  onBack: () => void;
}

const RecipeDetail: React.FC<RecipeDetailProps> = ({ recipe, onBack }) => {
  return (
    <div className="bg-white min-h-screen pb-20 animate-fade-in relative z-50">
      <div className="relative h-80 w-full">
        <img 
          src={recipe.imageUrl || "https://picsum.photos/600/400"} 
          alt={recipe.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60"></div>
        
        <div className="absolute top-0 left-0 right-0 p-6 flex justify-between items-center pt-12">
          <button onClick={onBack} className="bg-black/20 backdrop-blur-md h-10 w-10 flex items-center justify-center rounded-full text-white">
            <ArrowLeft size={20} />
          </button>
        </div>

        <div className="absolute bottom-6 left-6 right-6">
          <span className="px-2 py-1 bg-brand-500 text-white text-[10px] font-bold uppercase rounded mb-2 inline-block">
            {recipe.category}
          </span>
          <h1 className="text-3xl font-serif font-bold text-white shadow-black drop-shadow-md">
            {recipe.title}
          </h1>
        </div>
      </div>

      <div className="relative -mt-6 bg-white rounded-t-3xl px-6 pt-8 min-h-screen shadow-2xl">
        <div className="flex justify-between items-center mb-6 bg-gray-50 p-4 rounded-xl">
          <div className="flex flex-col items-center flex-1 border-r border-gray-200">
            <Clock size={18} className="text-brand-500 mb-1" />
            <span className="text-xs font-bold">{recipe.prepTime}</span>
          </div>
          <div className="flex flex-col items-center flex-1">
            <ChefHat size={18} className="text-brand-500 mb-1" />
            <span className="text-xs font-bold">Easy</span>
          </div>
        </div>

        <p className="text-gray-600 mb-6 text-sm leading-relaxed">{recipe.description}</p>

        <AdUnit slotId="detail-1" className="mb-6" />

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Ingredients</h2>
          <ul className="space-y-3">
            {recipe.ingredients.map((ing, idx) => (
              <li key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-gray-800 font-medium text-sm">{ing.item}</span>
                <span className="text-gray-500 text-xs font-bold">{ing.amount}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mb-8">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Instructions</h2>
          <div className="space-y-6">
            {recipe.instructions.map((step, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-100 text-brand-600 flex items-center justify-center text-xs font-bold mt-0.5">
                  {idx + 1}
                </div>
                <p className="text-gray-600 text-sm leading-6">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeDetail;