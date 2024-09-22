import { fetchRecipeById } from "@/app/lib/data";
import Link from "next/link";
import IngredientTable from "@/app/ui/ingredient-table";

export default async function Page(
	{ params } /*: {
  params: {
    id: string;
  };
}*/
) {
	const id = params.id;

	const recipe = await fetchRecipeById(id);

	return (
		<div>
			<Link className="link" href="/">
				Zurück
			</Link>

			<h1 className="mainHeading">
				{recipe.recipe_name} (id {recipe.id})
			</h1>

			{/* TODO: single number input with dynamic client side amount updates */}
			<div>für {recipe.portions} Portionen</div>

			<IngredientTable ingredients={recipe.ingredients} />

			<ol>
				{recipe.instructions.map((inst) => (
					<li key={inst.rec_id + inst.step}>{inst.instruction}</li>
				))}
			</ol>
		</div>
	);
}
