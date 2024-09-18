import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

let db = null;

const ITEMS_PER_PAGE = 50;
export async function fetchRecipeList(
	query /* string */,
	currentPage /* number */
) {
	const offset = (currentPage - 1) * ITEMS_PER_PAGE;

	if (!db) {
		// If the database instance is not initialized, open the database connection
		db = await open({
			filename: "./recipes.db", // Specify the database file path
			driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
		});
	}

	try {
		const recipes = await db.all(
			`
      SELECT
        Recipes.id,
        Recipes.category,
        Recipes.recipe_name
      FROM Recipes
      ORDER BY Recipes.category
      LIMIT ${ITEMS_PER_PAGE} OFFSET ${offset}
      `
			//   WHERE
			//     customers.name ILIKE ${`%${query}%`} OR
			//     customers.email ILIKE ${`%${query}%`} OR
			//     invoices.amount::text ILIKE ${`%${query}%`} OR
			//     invoices.date::text ILIKE ${`%${query}%`} OR
			//     invoices.status ILIKE ${`%${query}%`}
		);
		return recipes;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch invoices.");
	}
}

// export async function fetchInvoicesPages(query /* string*/) {
// 	try {
// 		const count = await sql`SELECT COUNT(*)
//     FROM invoices
//     JOIN customers ON invoices.customer_id = customers.id
//     WHERE
//       customers.name ILIKE ${`%${query}%`} OR
//       customers.email ILIKE ${`%${query}%`} OR
//       invoices.amount::text ILIKE ${`%${query}%`} OR
//       invoices.date::text ILIKE ${`%${query}%`} OR
//       invoices.status ILIKE ${`%${query}%`}
//   `;

// 		const totalPages = Math.ceil(Number(count.rows[0].count) / ITEMS_PER_PAGE);
// 		return totalPages;
// 	} catch (error) {
// 		console.error("Database Error:", error);
// 		throw new Error("Failed to fetch total number of invoices.");
// 	}
// }

export async function fetchRecipeById(id /* string */) {
	if (!db) {
		// If the database instance is not initialized, open the database connection
		db = await open({
			filename: "./recipes.db", // Specify the database file path
			driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
		});
	}

	try {
		const recipe = await db.get(`
      SELECT
        Recipes.id,
        Recipes.category,
        Recipes.recipe_name
      FROM Recipes
      WHERE Recipes.id = ${id};
    `);

		const instructions = await db.all(`
		SELECT
		    Instructions.rec_id,
		    Instructions.step,
		    Instructions.instruction
		  FROM Instructions
		  WHERE Instructions.rec_id = ${id};`);
		recipe.instructions = instructions;

		const ingredients = await db.all(`
			SELECT
				Ingredients.ingredient_name,
				Ingredients.id,
				rec_ing.ing_id,
				rec_ing.rec_id,
				rec_ing.amount,
				rec_ing.measurement,
				rec_ing.extra
			FROM rec_ing
			JOIN Ingredients ON Ingredients.id = rec_ing.ing_id
			WHERE rec_ing.rec_id = ${id};
			`);

		console.log(recipe);

		return recipe;
	} catch (error) {
		console.error("Database Error:", error);
		throw new Error("Failed to fetch recipe.");
	}
}
