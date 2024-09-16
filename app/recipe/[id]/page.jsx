import { fetchRecipeById } from "@/app/lib/data";

export default async function Page(
	{ params } /*: {
  params: {
    id: string;
  };
}*/
) {
	const id = params.id;

	const recipe = await fetchRecipeById(id);
	console.log(recipe);

	return (
		<>
			<h1 className="mainHeading">
				{recipe.id} - {recipe.recipe_name}
			</h1>

			<ol>
				{recipe.instructions.map((inst) => (
					<li key={inst.rec_id + inst.step}>{inst.instruction}</li>
				))}
			</ol>
		</>
	);
}
