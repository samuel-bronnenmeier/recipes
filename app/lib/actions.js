"use server";
import sqlite3 from "sqlite3";
import { open, Database } from "sqlite";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

let db = null;

export async function createRecipe(prevState, formData) {
	if (!db) {
		// If the database instance is not initialized, open the database connection
		db = await open({
			filename: "./recipes.db", // Specify the database file path
			driver: sqlite3.Database, // Specify the database driver (sqlite3 in this case)
		});
	}

	const recipeData = {
		recipeCategory: "",
		recipeName: "",
		portions: 4,
		ingredients: [],
		instructions: [],
	};
	const regex = new RegExp(/\d+([a-zA-Z]+)$/);

	for (const pair of formData.entries()) {
		if (pair[1]) {
			if (pair[0].startsWith("ingredient") && !regex.test(pair[0])) {
				const num = pair[0].replace(/^\D+|\D+$/g, "");
				recipeData.ingredients.push({
					ingredient_name: formData.get(`ingredient${num}`),
					amount: formData.get(`ingredient${num}Amount`),
					measurement: formData.get(`ingredient${num}Measurement`) || "Stk",
					extra: formData.get(`ingredient${num}Extra`),
				});
			} else if (pair[0].startsWith("instruction")) {
				recipeData.instructions.push(pair[1]);
			} else if (Object.hasOwn(recipeData, pair[0])) {
				recipeData[pair[0]] = pair[1];
			}
		}
	}

	console.log(recipeData);

	const insertRecipe = `
	INSERT INTO Recipes(category, recipe_name, portions)
	VALUES ('${recipeData.recipeCategory}', '${recipeData.recipeName}', '${recipeData.portions}');`;

	try {
		let recipeId = 0;

		await db.run(insertRecipe, function (err) {
			if (err) {
				return console.error(err.message);
			}
			recipeId = this.lastID; // get the id of the last inserted row
			console.log(`Rows inserted, ID ${recipeId}`);
		});

		recipeId = (await db.get("SELECT last_insert_rowid();"))[
			"last_insert_rowid()"
		];

		for (let i = 0; i < recipeData.ingredients.length; i++) {
			const element = recipeData.ingredients[i];

			const insertIngredient = `
			INSERT INTO Ingredients(rec_id, ingredient_name, amount, measurement, extra)
			VALUES ('${recipeId}', '${element.ingredient_name}', '${element.amount}', '${element.measurement}', '${element.extra}');`;

			db.run(insertIngredient, function (err) {
				if (err) {
					return console.error(err.message);
				}
				const id = this.lastID; // get the id of the last inserted row
				console.log(`Rows inserted, ID ${id}`);
			});
		}

		for (let i = 0; i < recipeData.instructions.length; i++) {
			const element = recipeData.instructions[i];

			const insertInstruction = `
			INSERT INTO Instructions(step, instruction, rec_id)
			VALUES ('${i + 1}', '${element}', '${recipeId}');`;

			db.run(insertInstruction, function (err) {
				if (err) {
					return console.error(err.message);
				}
				const id = this.lastID; // get the id of the last inserted row
				console.log(`Rows inserted, ID ${id}`);
			});
		}
	} catch (error) {
		// If a database error occurs, return a more specific error.
		return {
			message: "Database Error: Failed to Create recipe.",
		};
	}

	db.close();

	// Revalidate the cache for the invoices page and redirect the user.
	revalidatePath("/");
	redirect("/");
}
