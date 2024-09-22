import Link from "next/link";
import styles from "@/app/ui/buttons.module.css";

export function CreateRecipe() {
	return (
		<Link href={"./create"} className={styles.button}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M12 4.5v15m7.5-7.5h-15"
				/>
			</svg>
			<span>Neues Rezept</span>
		</Link>
	);
}

export function CancelCreation() {
	return (
		<Link
			href="/"
			className={`${styles.button} ${styles.grey}`}
			style={{ display: "inline-flex" }}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				strokeWidth={1.5}
				stroke="currentColor"
				className="size-6">
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					d="M6 18 18 6M6 6l12 12"
				/>
			</svg>
			<span>Abbrechen</span>
		</Link>
	);
}
