import Link from "next/link";

import styles from "./page.module.css";

import RecipeList from "./ui/recipe-list";

export default function Home() {
	return (
		<div className="page">
			<h1 className="mainHeading">Das digitale Rezeptbuch</h1>

			<div className="section">
				<Link href={"./create"} className="link">
					Neues Rezept
				</Link>
			</div>

			<div className="section">
				<RecipeList />
			</div>
		</div>
	);
}
