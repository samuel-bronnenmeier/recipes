import Link from "next/link";

import styles from "./page.module.css";

import RecipeList from "./ui/recipe-list";
import { CreateRecipe } from "./ui/buttons";

export default function Home() {
	return (
		<div className="page">
			<h1 className="mainHeading">Das digitale Rezeptbuch</h1>

			<div className="section">
				<CreateRecipe />
			</div>

			<div className="section">
				<RecipeList />
			</div>
		</div>
	);
}
