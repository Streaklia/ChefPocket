import React, { useState, useEffect } from 'react';
import { Wand2, Loader2, Save, Image as ImageIcon, Key } from 'lucide-react';
import { Recipe, RecipeCategory, Ingredient } from '../types';
import { generateRecipeDetails, generateRecipeImage } from '../services/geminiService';

interface AdminUploadProps {
  onAddRecipe: (recipe: Recipe) => void;
}

const AdminUpload: React.FC<AdminUploadProps> = ({ onAddRecipe }) => {
  const [apiKey, setApiKey] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<RecipeCategory>(RecipeCategory.BREAKFAST);
  const [prepTime, setPrepTime] = useState('');
  const [description, setDescription] = useState('');
  const [ingredients, setIngredients] = useState<Ingredient[]>([{ item: '', amount: '' }]);
  const [instructions, setInstructions] = useState<string[]>(['']);
  const [imageFile, setImageFile] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);

  useEffect(() => {
    const storedKey = localStorage.getItem('gemini_api_key');
    if (storedKey) setApiKey(storedKey);
  }, []);

  const handleSaveKey = () => {
    localStorage.setItem('gemini_api_key', apiKey);
    alert('API Key Saved!');
  };

  const handleMagicGenerateAll = async () => {
    if (!apiKey) {
      alert("Please enter and save your Gemini API Key first!");
      return;
    }
    if (!title) {
      alert("Please enter a recipe name first!");
      return;
    }
    setIsGenerating(true);
    try {
      const [textData, imageData] = await Promise.all([
        generateRecipeDetails(title, apiKey),
        generateRecipeImage(title, apiKey)
      ]);
      if (textData) {
        setDescription(textData.description);
        setIngredients(textData.ingredients);
        setInstructions(textData.instructions);
        setPrepTime(textData.prepTime);
      }
      if (imageData) setImageFile(imageData);
    } catch (e) {
      alert("AI Generation failed. Check your API Key.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newRecipe: Recipe = {
      id: Date.now().toString(),
      title,
      category,
      imageUrl: imageFile || '',
      description,
      ingredients: ingredients.filter(i => i.item.trim() !== ''),
      instructions: instructions.filter(i => i.trim() !== ''),
      prepTime,
      createdAt: Date.now(),
    };
    onAddRecipe(newRecipe);
  };

  return (
    <div className="pb-32 bg-gray-50 min-h-screen">
      <header className="bg-white px-6 pt-12 pb-4 border-b border-gray-100 sticky top-0 z-30">
        <h1 className="text-xl font-bold text-gray-900">New Recipe</h1>
      </header>

      <div className="px-5 py-6 space-y-6">
        
        {/* API KEY SECTION */}
        <div className="bg-gray-900 p-4 rounded-xl text-white">
          <label className="text-xs font-bold text-gray-400 uppercase flex items-center mb-2">
            <Key size={12} className="mr-1" /> Gemini API Key
          </label>
          <div className="flex gap-2">
            <input 
              type="password" 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="Paste Key Here"
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-3 py-2 text-sm outline-none"
            />
            <button onClick={handleSaveKey} className="bg-brand-500 px-4 py-2 rounded-lg text-xs font-bold">Save</button>
          </div>
        </div>

        <div className="bg-brand-500 p-6 rounded-2xl text-white shadow-lg shadow-brand-500/30">
          <label className="text-xs font-bold text-brand-100 uppercase">Recipe Name</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Avocado Toast"
            className="w-full bg-white/20 border border-white/30 rounded-lg p-3 text-white placeholder:text-brand-100 font-bold mt-2 outline-none"
          />
          <button
            onClick={handleMagicGenerateAll}
            disabled={isGenerating || !title}
            className="w-full bg-white text-brand-600 py-3 rounded-lg font-bold mt-4 flex items-center justify-center"
          >
            {isGenerating ? <Loader2 className="animate-spin mr-2" /> : <Wand2 className="mr-2" />}
            Generate Everything
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="bg-white p-4 rounded-xl border border-gray-200 text-center">
            {imageFile ? (
              <img src={imageFile} className="w-full h-40 object-cover rounded-lg" alt="Preview" />
            ) : (
              <div className="text-gray-400 py-8 flex flex-col items-center">
                <ImageIcon />
                <span className="text-xs mt-2">Image will appear here</span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Category</label>
              <select value={category} onChange={e => setCategory(e.target.value as any)} className="w-full p-3 bg-white rounded-lg border border-gray-200 mt-1">
                {Object.values(RecipeCategory).map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase">Time</label>
              <input type="text" value={prepTime} onChange={e => setPrepTime(e.target.value)} className="w-full p-3 bg-white rounded-lg border border-gray-200 mt-1" />
            </div>
            <div>
               <label className="text-xs font-bold text-gray-400 uppercase">Description</label>
               <textarea value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 bg-white rounded-lg border border-gray-200 mt-1" rows={3} />
            </div>
          </div>

          <button type="submit" className="w-full bg-gray-900 text-white py-4 rounded-xl font-bold shadow-xl flex justify-center items-center">
            <Save className="mr-2" size={20} /> Save Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminUpload;