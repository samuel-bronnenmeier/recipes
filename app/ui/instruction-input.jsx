import { useState } from "react";

export default function InstructionInput() {
	const [state, setState] = useState(1);

	function handleClick() {
		setState(state + 1);
	}

	return (
		<>
			{Array(state)
				.fill(true)
				.map((_, i) => (
					<SingleInstruction number={i + 1} key={i + 1} />
				))}
			<button type="button" onClick={handleClick}>
				Zubereitungsschritt hinzufügen
			</button>
		</>
	);
}

function SingleInstruction({ number }) {
	return (
		<div>
			<label htmlFor={`instruction${number}`}>Schritt {number}:</label>
			<textarea name={`instruction${number}`} id={`instruction-${number}`} />
		</div>
	);
}
