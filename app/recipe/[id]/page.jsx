import { fetchRecipeById } from "@/app/lib/data";
import Link from "next/link";

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
				{recipe.id} - {recipe.recipe_name}
			</h1>

			<ol>
				{recipe.instructions.map((inst) => (
					<li key={inst.rec_id + inst.step}>{inst.instruction}</li>
				))}
			</ol>
		</div>
	);
}
