import Link from "next/link";

import styles from "./page.module.css";

import RecipeList from "./ui/recipe-list";

export default function Home() {
	return (
		<div className={styles.page}>
			<h1 className={styles.mainHeading}>Das digitale Rezeptbuch</h1>

			<div className={styles.section}>
				<Link href={"./create"} className={styles.link}>
					Neues Rezept
				</Link>
			</div>

			<div className={styles.section}>
				<RecipeList />
			</div>
		</div>
	);
}
