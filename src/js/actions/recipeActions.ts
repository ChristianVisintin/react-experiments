/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { Dispatch } from "redux";
import axios from "axios";

import Recipe from "../lib/data/recipe";
import Ingredient from "../lib/data/ingredient";

// Action names
export const FETCH_RECIPES: string = "FETCH_RECIPES";

/**
 * @function fetchRecipes
 * @description fetch recipes on remote server and dispatch to store
 */

export const fetchRecipes = () => async (dispatch: Dispatch) => {
  try {
    const response = await axios.get("http://localhost:3000/recipes");
    const recipesData = response.data;
    let recipes: Array<Recipe> = new Array();
    for (const recipe of recipesData) {
      // Get ingredients
      const ingredients: Array<Ingredient> = new Array();
      for (const ingredient of recipe.ingredients) {
        ingredients.push(new Ingredient(ingredient.name, ingredient.quantity, ingredient.measure));
      }
      // Create recipe
      recipes.push(
        new Recipe(
          recipe.id,
          recipe.title,
          recipe.category,
          recipe.date,
          recipe.img,
          recipe.body,
          ingredients,
          recipe.persons,
          recipe.tags
        )
      );
    }
    recipes.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
    dispatch({
      type: FETCH_RECIPES,
      payload: recipes,
    });
  } catch (error) {
    console.error("Could not fetch recipes", error.message);
    throw error;
  }
};
