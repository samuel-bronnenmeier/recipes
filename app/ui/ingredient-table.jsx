export default function IngredientTable({ ingredients }) {
	return (
		<div>
			<div>Zutaten:</div>

			<table>
				{/* <thead>
					<tr>
						<th>Menge</th>
						<th>Einheit</th>
						<th>Zutat</th>
            <th>Extras</th>
					</tr>
				</thead> */}

				<tbody>
					{ingredients.map((ing) => (
						<tr key={ing.ingredient_name}>
							<td>{ing.amount}</td>
							<td>{ing.measurement}</td>
							<td>{ing.ingredient_name}</td>
							<td>({ing.extra})</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
