import { useEffect } from 'react';
import type { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData, useNavigate } from '@remix-run/react';
import type { Recipe } from '~/components/features/user/list/types/recipe';
import { useRecipeStore } from '~/components/features/user/list/stores/recipeStore';
import { RecipeList } from '~/components/features/user/list/components/RecipeList';
import { createClient } from '~/utils/supabase.server';

/**
 * ローダー関数
 * @param {LoaderFunctionArgs} args - ローダー関数の引数
 * @returns {Promise<{ recipes: Recipe[] }>} - レシピのリストを含むオブジェクト
 */
export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createClient(request);
  const { data: recipes } = await supabase.from('recipes').select(`
      id,
      name,
      bean_amount,
      water_temperature,
      water_amount,
      grinder_name,
      dripper_name,
      description,
      roast_level,
      grind_level
    `);

  return { recipes };
}

/**
 * レシピ一覧画面コンポーネント
 * @returns {JSX.Element} - レシピ一覧画面の JSX 要素
 */
export default function RecipeListPage() {
  const { recipes } = useLoaderData<{ recipes: Recipe[] }>();
  const { setRecipes } = useRecipeStore();
  const navigate = useNavigate();

  // loader で取得したデータを Zustand のストアに反映
  useEffect(() => {
    if (recipes) {
      setRecipes(recipes);
    }
  }, [recipes, setRecipes]);

  // レシピ選択時に詳細画面へ遷移
  const handleSelectRecipe = (recipe: Recipe) => {
    navigate(`/recipes/${recipe.id}`);
  };

  return <RecipeList recipes={recipes} onSelectRecipe={handleSelectRecipe} />;
}
