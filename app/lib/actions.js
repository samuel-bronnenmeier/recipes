"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createRecipe(prevState, formData) {
	const recipeName = formData.get("recipeName");
	const ingredient = formData.get("ingredient0");

	try {
		// 	await sql`
		//   INSERT INTO invoices (customer_id, amount, status, date)
		//   VALUES (${customerId}, ${amountInCents}, ${status}, ${date})
		// `;
		console.log(recipeName);
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			message: "Database Error: Failed to Create recipe.",
		};
	}

	// Revalidate the cache for the invoices page and redirect the user.
	revalidatePath("/");
	redirect("/");
}
