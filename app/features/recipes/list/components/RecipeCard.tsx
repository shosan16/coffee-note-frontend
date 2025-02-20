import type { Recipe } from '../types/recipe';
import { Card, CardContent, CardTitle } from '~/shared/components/ui/card';
import { Bean, Droplet, Settings } from 'lucide-react';

/**
 * @typedef  RecipeCardProps
 * @property recipe - レシピのデータを表すオブジェクト。
 * @property onClick - カードクリック時に実行されるコールバック関数。
 */
type RecipeCardProps = {
  recipe: Recipe;
  onClick: () => void;
};

export default function RecipeCard({ recipe, onClick }: RecipeCardProps) {
  return (
    <Card
      className="cursor-pointer border border-gray-200 transition-shadow hover:shadow-lg"
      onClick={onClick}
    >
      <CardContent className="p-6">
        <CardTitle className="mb-2 text-xl font-semibold text-gray-800">
          {recipe.name}
        </CardTitle>
        <p className="mb-4 text-sm text-gray-600">{recipe.description}</p>
        <div className="space-y-3">
          <div className="flex items-center">
            <Settings className="mr-2 h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {recipe.grinder_name ? `${recipe.grinder_name} / ` : ''}
              {recipe.dripper_name}
            </span>
          </div>
          <div className="flex items-center">
            <Bean className="mr-2 h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {`${recipe.roast_level} / ${recipe.grind_level} / ${recipe.bean_amount}g`}
            </span>
          </div>
          <div className="flex items-center">
            <Droplet className="mr-2 h-5 w-5 text-gray-500" />
            <span className="text-sm text-gray-700">
              {`${recipe.water_temperature}℃ / ${recipe.water_amount}ml`}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
