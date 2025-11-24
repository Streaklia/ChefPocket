import React, { useState, useEffect } from 'react';
import { HashRouter } from 'react-router-dom';
import { HeartIcon } from 'lucide-react';
import Home from './pages/Home';
import RecipeDetail from './pages/RecipeDetail';
import AdminUpload from './pages/AdminUpload';
import Login from './pages/Login';
import Navigation from './components/Navigation';
import { Recipe, RecipeCategory } from './types';

// STATIC DATA V3
const INITIAL_RECIPES: Recipe[] = [
  {
    id: 's1', title: 'Fluffy Pancakes', category: RecipeCategory.BREAKFAST, prepTime: '15m',
    imageUrl: 'https://images.unsplash.com/photo-1528207776546-365bb710ee93?w=800',
    description: 'Golden, fluffy buttermilk pancakes stacked high and served with maple syrup.',
    ingredients: [{ item: 'Flour', amount: '1.5 cups' }, { item: 'Milk', amount: '1 cup' }],
    instructions: ['Mix dry ingredients.', 'Add wet ingredients.', 'Cook on griddle.'],
    createdAt: 1
  },
  {
    id: 's2', title: 'Banana Oatmeal', category: RecipeCategory.BREAKFAST, prepTime: '10m',
    imageUrl: 'https://images.unsplash.com/photo-1517673132405-a56a62b18caf?w=800',
    description: 'Warm oatmeal sweetened with ripe bananas.',
    ingredients: [{ item: 'Oats', amount: '1/2 cup' }, { item: 'Banana', amount: '1' }],
    instructions: ['Cook oats in milk.', 'Mash in banana.', 'Serve warm.'],
    createdAt: 2
  },
  {
    id: 's3', title: 'Veggie Omelette', category: RecipeCategory.BREAKFAST, prepTime: '10m',
    imageUrl: 'https://images.unsplash.com/photo-1510693206972-df098062cb71?w=800',
    description: 'Protein-packed omelette with fresh veggies.',
    ingredients: [{ item: 'Eggs', amount: '3' }, { item: 'Peppers', amount: '1/4 cup' }],
    instructions: ['Whisk eggs.', 'Sauté veggies.', 'Cook eggs over veggies.'],
    createdAt: 3
  },
  {
    id: 's4', title: 'Tuna Sandwich', category: RecipeCategory.LUNCH, prepTime: '5m',
    imageUrl: 'https://images.unsplash.com/photo-1550505393-2548817e971d?w=800',
    description: 'Creamy tuna salad on toasted bread.',
    ingredients: [{ item: 'Tuna', amount: '1 can' }, { item: 'Mayo', amount: '1 tbsp' }],
    instructions: ['Mix tuna and mayo.', 'Spread on bread.'],
    createdAt: 4
  },
  {
    id: 's5', title: 'Chicken Salad', category: RecipeCategory.LUNCH, prepTime: '15m',
    imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
    description: 'Grilled chicken over mixed greens.',
    ingredients: [{ item: 'Chicken', amount: '1 breast' }, { item: 'Greens', amount: '3 cups' }],
    instructions: ['Grill chicken.', 'Toss greens.', 'Combine.'],
    createdAt: 5
  },
  {
    id: 's6', title: 'Toast Pizza', category: RecipeCategory.LUNCH, prepTime: '10m',
    imageUrl: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=800',
    description: 'Mini pizzas on toast.',
    ingredients: [{ item: 'Bread', amount: '2 slices' }, { item: 'Cheese', amount: '1/2 cup' }],
    instructions: ['Toast bread.', 'Add sauce and cheese.', 'Broil.'],
    createdAt: 6
  },
  {
    id: 's7', title: 'Chicken Pasta', category: RecipeCategory.DINNER, prepTime: '25m',
    imageUrl: 'https://images.unsplash.com/photo-1626844131082-256783844137?w=800',
    description: 'Creamy garlic pasta with chicken.',
    ingredients: [{ item: 'Pasta', amount: '200g' }, { item: 'Chicken', amount: '200g' }],
    instructions: ['Boil pasta.', 'Cook chicken.', 'Combine with sauce.'],
    createdAt: 7
  },
  {
    id: 's8', title: 'Vegetable Rice', category: RecipeCategory.DINNER, prepTime: '20m',
    imageUrl: 'https://images.unsplash.com/photo-1603133872878-684f10842619?w=800',
    description: 'Fried rice with mixed veggies.',
    ingredients: [{ item: 'Rice', amount: '2 cups' }, { item: 'Veggies', amount: '1 cup' }],
    instructions: ['Fry veggies.', 'Add rice.', 'Season.'],
    createdAt: 8
  },
  {
    id: 's9', title: 'Lentil Soup', category: RecipeCategory.DINNER, prepTime: '30m',
    imageUrl: 'https://images.unsplash.com/photo-1547592166-23acbe346499?w=800',
    description: 'Hearty lentil soup.',
    ingredients: [{ item: 'Lentils', amount: '1 cup' }, { item: 'Broth', amount: '4 cups' }],
    instructions: ['Sauté veg.', 'Add liquids.', 'Simmer.'],
    createdAt: 9
  }
];

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState('home');
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('cp_recipes_v3');
    if (saved) {
      setRecipes(JSON.parse(saved));
    } else {
      setRecipes(INITIAL_RECIPES);
      localStorage.setItem('cp_recipes_v3', JSON.stringify(INITIAL_RECIPES));
    }
  }, []);

  const handleAddRecipe = (newRecipe: Recipe) => {
    const updated = [newRecipe, ...recipes];
    setRecipes(updated);
    localStorage.setItem('cp_recipes_v3', JSON.stringify(updated));
    setCurrentView('home');
  };

  const handleRecipeClick = (r: Recipe) => {
    setSelectedRecipe(r);
    setCurrentView('detail');
  };

  return (
    <HashRouter>
      <div className="w-full min-h-screen bg-gray-50 relative">
        {currentView === 'detail' && selectedRecipe ? (
          <RecipeDetail recipe={selectedRecipe} onBack={() => setCurrentView('home')} />
        ) : (
          <>
            {currentView === 'home' && <Home recipes={recipes} onRecipeClick={handleRecipeClick} />}
            {currentView === 'admin' && (isLoggedIn ? <AdminUpload onAddRecipe={handleAddRecipe} /> : <Login onLogin={() => setIsLoggedIn(true)} />)}
            {currentView === 'login' && <Login onLogin={() => { setIsLoggedIn(true); setCurrentView('admin'); }} />}
            {currentView === 'favorites' && <div className="p-10 text-center text-gray-400 mt-20">No favorites yet</div>}
            
            <Navigation currentView={currentView} setView={setCurrentView} isAdmin={isLoggedIn} />
          </>
        )}
      </div>
    </HashRouter>
  );
};

export default App;