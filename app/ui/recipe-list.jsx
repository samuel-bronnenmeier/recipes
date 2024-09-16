import Link from "next/link";
import { fetchRecipeList } from "@/app/lib/data";

export default async function RecipeList(
	{ searchParams } /*: {
  searchParams? : {
    query?: string;
    page?: string;
  };
}*/
) {
	const query = searchParams?.query || "";
	const currentPage = Number(searchParams?.page) || 1;

	const recipes = await fetchRecipeList(query, currentPage);

	return (
		<ul>
			{[...recipes].map((recipe) => (
				<li key={recipe.id}>
					<Link href={`/recipe/${recipe.id}`}>{recipe.recipe_name}</Link>
				</li>
			))}
		</ul>
	);
}
