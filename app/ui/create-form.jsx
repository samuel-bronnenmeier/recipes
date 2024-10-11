"use client";

import { CancelCreation, SubmitForm } from "./buttons";
import { createRecipe } from "@/app/lib/actions";
import { categories } from "@/app/lib/definitions";
import IngredientInput from "@/app/ui/ingredient-input";
import InstructionInput from "@/app/ui/instruction-input";
import { useFormState } from "react-dom";

import styles from "@/app/ui/create-form.module.css";

export default function Form() {
	const initialState = { message: null, errors: {} };
	const [state, formAction] = useFormState(createRecipe, initialState);

	return (
		<form action={formAction} className={styles.form}>
			<div className={styles.section}>
				<label htmlFor="recipeCategory">Kategorie:</label>
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

			<div className={styles.section}>
				<label htmlFor="recipeName">Titel:</label>
				<input type="text" name="recipeName" id="recipeName" />
			</div>

			<div className={styles.section}>
				<label htmlFor="portions">Anzahl der Portionen:</label>
				<input type="number" name="portions" id="portions" defaultValue="4" />
			</div>

			<div className={styles.section}>
				<div>Zutaten:</div>
				<IngredientInput />
			</div>

			<div className={styles.section}>
				<div>Zubereitung:</div>
				<InstructionInput />
			</div>

			<div className={`${styles.buttonContainer}`}>
				<CancelCreation />
				<SubmitForm />
			</div>
		</form>
	);
}
