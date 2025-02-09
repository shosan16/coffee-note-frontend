import { LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { createClient } from '../utils/supabase.server';

export async function loader({ request }: LoaderFunctionArgs) {
  const supabase = createClient(request);
  const { data: recipes } = await supabase.from('recipes').select();

  return { recipes };
}

export default function Index() {
  const { recipes } = useLoaderData<typeof loader>();
  console.log('recipes', recipes);

  return (
    <ul>
      {recipes &&
        recipes.map((recipe) => <li key={recipe.id}>{recipe.grinder_name}</li>)}
    </ul>
  );
}
