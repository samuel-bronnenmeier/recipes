"use client";

import Link from "next/link";
import { createRecipe } from "@/app/lib/actions";
import { categories } from "@/app/lib/definitions";
import IngredientInput from "@/app/ui/ingedient-input";
import InstructionInput from "@/app/ui/instruction-input";
import { useFormState } from "react-dom";

import styles from "@/app/ui/create-form.module.css";

export default function Form() {
	const initialState = { message: null, errors: {} };
	const [state, formAction] = useFormState(createRecipe, initialState);

	// const values4 = [
	// 	"Zorua",
	// 	"Basic Pokemon. HP 60. Stampede 10. Ram 20. Weakness: Fighting x2, Resistance: Psychic -20. Retreat Cost: 1.",
	// 	"/collection/item4.png",
	// ];

	// const insertSql = `INSERT INTO items(name, description, img) VALUES(?, ?, ?)`;

	// db.run(insertSql, values1, function (err) {
	// 	if (err) {
	// 		return console.error(err.message);
	// 	}
	// 	const id = this.lastID; // get the id of the last inserted row
	// 	console.log(`Rows inserted, ID ${id}`);
	// });

	return (
		<form action={formAction}>
			<div className="section">
				<label htmlFor="recipeCategory">Kategorie</label>
				<select name="recipeCategory" id="recipeCategory" defaultValue="">
					<option value="" disabled>
						Kategorie wählen
					</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
			</div>

			<div className="section">
				<label htmlFor="recipeName">Titel</label>
				<input type="text" name="recipeName" id="recipeName" />
			</div>

			<div className="section">
				<IngredientInput />
			</div>

			<div className="section">
				<InstructionInput />
			</div>

			<div className="section">
				<Link href="/" className="link">
					Abbrechen
				</Link>
				<button type="submit">Rezept hinzufügen</button>
			</div>
		</form>
	);
}
