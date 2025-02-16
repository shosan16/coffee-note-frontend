import type { Recipe } from '../types/recipe';
import RecipeCard from './RecipeCard';

/**
 * @typedef RecipeListProps
 * @property recipes - 表示するレシピの配列。
 * @property onSelectRecipe - レシピカードがクリックされた時に呼び出される関数。
 */
type RecipeListProps = {
  recipes: Recipe[];
  onSelectRecipe: (recipe: Recipe) => void;
};

/**
 * レシピ一覧コンポーネント
 * 複数の RecipeCard をグリッド表示する。
 *
 * @param {RecipeListProps} props - コンポーネントのプロパティ。
 * @returns {JSX.Element} レンダリングされたレシピ一覧のグリッド。
 */
export function RecipeList({ recipes, onSelectRecipe }: RecipeListProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {recipes.map((recipe) => (
        <RecipeCard
          key={recipe.id}
          recipe={recipe}
          onClick={() => onSelectRecipe(recipe)}
        />
      ))}
    </div>
  );
}
