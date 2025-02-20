import { create } from 'zustand';
import type { Recipe } from '~/features/recipes/list/types/recipe';

/**
 * レシピ状態管理ストアの型定義
 *
 * @typedef RecipeStore
 * @property recipes - API から取得したレシピデータ（初期状態は空配列）
 * @property selectedRecipe - ユーザーが選択したレシピ（初期状態は null）
 * @property selectRecipe - レシピを選択する関数
 * @property setRecipes - レシピデータを更新する関数
 */
type RecipeStore = {
  recipes: Recipe[];
  selectedRecipe: Recipe | null;
  selectRecipe: (recipe: Recipe | null) => void;
  setRecipes: (recipes: Recipe[]) => void;
};

export const useRecipeStore = create<RecipeStore>((set) => ({
  recipes: [],
  selectedRecipe: null,
  selectRecipe: (recipe: Recipe | null) => set({ selectedRecipe: recipe }),
  setRecipes: (recipes: Recipe[]) => set({ recipes }),
}));
