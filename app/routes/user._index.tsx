import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '../utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createClient(request);
  const { data: recipes } = await supabase.from('recipes').select(`
    id,
    name,
    bean_amount,
    water_amount,
    grinder_name,
    dripper_name,
    description,
    roast_level,
    grind_level
  `);

  return { recipes };
}

export default function Index() {
  const { recipes } = useLoaderData<typeof loader>();
  console.log('recipes', recipes);

  return (
    <ul>
      {recipes?.map((recipe) => <li key={recipe.id}>{recipe.grinder_name}</li>)}
    </ul>
  );
}
