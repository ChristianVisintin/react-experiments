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
export const GET_RECIPE: string = "GET_RECIPE";
export const LIKE_RECIPE: string = "LIKE_RECIPE";

// API url
const API_URL = "/api";

/**
 * @function fetchRecipes
 * @description fetch recipes on remote server and dispatch to store
 * @param {string} lang ISO 639
 * @param {string | undefined} orderBy order recipes by...
 * @param {number | undefined} limit results to...
 * @param {number | undefined} offset result offsets
 * @param {string | undefined} category category to filter result by
 */

export const fetchRecipes = (
  lang: string,
  orderBy: string | undefined = undefined,
  limit: number | undefined = undefined,
  offset: number | undefined = undefined,
  category: string | undefined = undefined
) => async (dispatch: Dispatch) => {
  try {
    // Build url
    let url = API_URL + "/list-recipes?";
    if (orderBy) {
      url += "orderBy=" + orderBy + "&";
    }
    if (limit) {
      url += "limit=" + limit + "&";
    }
    if (offset) {
      url += "offset=" + offset + "&";
    }
    if (category) {
      url += "category=" + category + "&";
    }
    const response = await axios.get(url);
    const recipesData = response.data;
    let recipes: Array<Recipe> = new Array();
    const title_key = "title_" + lang;
    for (const recipe of recipesData) {
      // Get title
      const title = recipe[title_key];
      // Create recipe without details
      recipes.push(
        new Recipe(recipe.id, title, recipe.category, recipe.date, recipe.img)
      );
    }
    dispatch({
      type: FETCH_RECIPES,
      payload: recipes,
    });
  } catch (error) {
    console.error("Could not fetch recipes", error.message);
    throw error;
  }
};

/**
 * @function getRecipe
 * @description get recipe details from server and dispatch to store
 * @param {string} lang current language ISO639
 * @param {string} id recipe id
 */

export const getRecipe = (lang: string, id: string) => async (
  dispatch: Dispatch
) => {
  try {
    // Build url
    let url = API_URL + "/recipe/" + id;
    const response = await axios.get(url);
    const data = response.data;
    // Get ingredients
    const ingredients: Array<Ingredient> = new Array();
    for (const ingredient of data.ingredients) {
      ingredients.push({
        name: ingredient.name,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
      });
    }
    const title_key = "title_" + lang;
    const body_key = "body_" + lang;
    // Get title
    const title = data[title_key];
    const body = data[body_key];
    // Create recipe without details
    const recipe: Recipe = new Recipe(
      data.id,
      title,
      data.category,
      data.date,
      data.img,
      data.persons,
      ingredients,
      body,
      data.likes
    );
    dispatch({
      type: GET_RECIPE,
      payload: recipe,
    });
  } catch (error) {
    console.error("Could not get recipe", error.message);
    throw error;
  }
};

/**
 * @function likeRecipe
 * @description like provided recipe; return updated recipe record
 * @param {string} lang current language ISO639
 * @param {string} id recipe id
 */

export const likeRecipe = (lang: string, id: string) => async (
  dispatch: Dispatch
) => {
  try {
    // Build url
    let url = API_URL + "/like-recipe/" + id;
    const response = await axios.post(url);
    const data = response.data;
    // Get ingredients
    const ingredients: Array<Ingredient> = new Array();
    for (const ingredient of data.ingredients) {
      ingredients.push({
        name: ingredient.name,
        quantity: ingredient.quantity,
        measure: ingredient.measure,
      });
    }
    const title_key = "title_" + lang;
    const body_key = "body_" + lang;
    // Get title
    const title = data[title_key];
    const body = data[body_key];
    // Create recipe without details
    const recipe: Recipe = new Recipe(
      data.id,
      title,
      data.category,
      data.date,
      data.img,
      data.persons,
      ingredients,
      body,
      data.likes
    );
    dispatch({
      type: LIKE_RECIPE,
      payload: recipe,
    });
  } catch (error) {
    console.error("Could not like recipe", error.message);
    throw error;
  }
};
