export enum RecipeCategory {
  BREAKFAST = 'Breakfast',
  LUNCH = 'Lunch',
  DINNER = 'Dinner',
}

export interface Ingredient {
  item: string;
  amount: string;
}

export interface Recipe {
  id: string;
  title: string;
  category: RecipeCategory;
  imageUrl: string; 
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: string;
  createdAt: number;
}

export interface AIResponseRecipe {
  description: string;
  ingredients: Ingredient[];
  instructions: string[];
  prepTime: string;
}