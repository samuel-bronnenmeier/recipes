import { useState } from "react";
import styles from "@/app/ui/ingredient-input.module.css";

export default function IngredientInput() {
	const [state, setState] = useState(1);

	function handleClick() {
		setState(state + 1);
	}

	return (
		<>
			{Array(state)
				.fill(true)
				.map((_, i) => (
					<SingleIngredient number={i + 1} key={i + 1} />
				))}
			<button type="button" onClick={handleClick}>
				Zutat hinzufügen
			</button>
		</>
	);
}

function SingleIngredient({ number }) {
	return (
		<div className={styles.row}>
			<label htmlFor={`ingredient${number}`}>Zutat {number}:</label>
			<input
				type="text"
				name={`ingredient${number}`}
				id={`ingredient-${number}`}
			/>
			<label htmlFor={`ingredient${number}Amount`}>Menge</label>
			<input
				type="number"
				name={`ingredient${number}Amount`}
				id={`ingredient-${number}-amount`}
			/>
			<label htmlFor={`ingredient${number}Measurement`}>Einheit</label>
			<input
				type="text"
				name={`ingredient${number}Measurement`}
				id={`ingredient-${number}-measurement`}
			/>
			<label htmlFor={`ingredient${number}Extra`}>Extras</label>
			<input
				type="text"
				name={`ingredient${number}Extra`}
				id={`ingredient-${number}-extra`}
			/>
		</div>
	);
}
