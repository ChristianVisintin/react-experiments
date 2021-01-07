/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import axios from "axios";

import Recipe from "../lib/data/recipe";
import Ingredient from "../lib/data/ingredient";
import { Category } from "../lib/data/category";

// Action names
export const GET_CAROUSEL_RECIPES: string = uuidv4();
export const GET_LATEST_RECIPES: string = uuidv4();
export const GET_RELATED_RECIPES: string = uuidv4();
export const SEARCH_RECIPES: string = uuidv4();
export const LOAD_MORE_RECIPES: string = uuidv4();
export const GET_RECIPE: string = uuidv4();
export const LIST_CATEGORIES: string = uuidv4();
export const LIKE_RECIPE: string = uuidv4();

// API url
const API_URL = "/api";

/**
 * @function getCarouselRecipes
 * @description get recipes for carousel
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {number | undefined} limit results to...
 */

export const getCarouselRecipes = (
  lang: string,
  categories: Array<Category>,
  limit: number
) => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_CAROUSEL_RECIPES,
    payload: await fetchRecipes(
      lang,
      categories,
      undefined,
      undefined,
      undefined,
      limit,
      undefined,
      true
    ),
  });
};

/**
 * @function getLatestRecipes
 * @description get latest n recipes
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {number | undefined} limit results to...
 */

export const getLatestRecipes = (
  lang: string,
  categories: Array<Category>,
  limit: number
) => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_LATEST_RECIPES,
    payload: await fetchRecipes(
      lang,
      categories,
      undefined,
      undefined,
      "date",
      limit
    ),
  });
};

/**
 * @function getLatestRecipes
 * @description get latest n recipes
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {string | undefined} category
 * @param {number} limit results to...
 * @param {shuffle} boolean
 */

export const getRelatedRecipes = (
  lang: string,
  categories: Array<Category>,
  category: string | undefined,
  limit: number,
  shuffle: boolean
) => async (dispatch: Dispatch) => {
  dispatch({
    type: GET_RELATED_RECIPES,
    payload: await fetchRecipes(
      lang,
      categories,
      undefined,
      category,
      "date",
      limit,
      undefined,
      shuffle
    ),
  });
};

/**
 * @function searchRecipes
 * @description search recipes
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {string | undefined} title
 * @param {string | undefined} category
 * @param {number} limit results to...
 */

export const searchRecipes = (
  lang: string,
  categories: Array<Category>,
  title: string | undefined,
  category: string | undefined,
  orderBy: string | undefined,
  limit: number
) => async (dispatch: Dispatch) => {
  dispatch({
    type: SEARCH_RECIPES,
    payload: await fetchRecipes(
      lang,
      categories,
      title,
      category,
      orderBy,
      limit,
    ),
  });
};

/**
 * @function loadMoreRecipes
 * @description load more recipes (recipes are appended)
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {string | undefined} title
 * @param {string | undefined} category
 * @param {number} limit results to...
 * @param {number} offset
 */

export const loadMoreRecipes = (
  lang: string,
  categories: Array<Category>,
  title: string | undefined,
  category: string | undefined,
  orderBy: string | undefined,
  limit: number,
  offset: number
) => async (dispatch: Dispatch) => {
  dispatch({
    type: LOAD_MORE_RECIPES,
    payload: await fetchRecipes(
      lang,
      categories,
      title,
      category,
      orderBy,
      limit,
      offset
    ),
  });
};

/**
 * @function getRecipe
 * @description get recipe details from server and dispatch to store
 * @param {string} lang current language ISO639
 * @param {Array<Category>} categories
 * @param {string} id recipe id
 */

export const getRecipe = (
  lang: string,
  categories: Array<Category>,
  id: string
) => async (dispatch: Dispatch) => {
  try {
    // Build url
    let url = API_URL + "/recipe/" + id;
    const response = await axios.get(url);
    const data = response.data;
    // Get ingredients
    const ingredients: Array<Ingredient> = new Array();
    const ingredient_name_key = "name_" + lang;
    for (const ingredient of data.recipeIngredients) {
      ingredients.push({
        name: ingredient[ingredient_name_key],
        quantity: ingredient.quantity,
        measure: ingredient.measure,
      });
    }
    // Get categories
    let recipeCategories: Array<string> = new Array();
    for (const c of data.categories) {
      for (const cat of categories) {
        if (cat.id === c) {
          recipeCategories.push(cat.name);
        }
      }
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
      recipeCategories,
      data.date,
      data.images,
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
 * @function listCategories
 * @description get available categories from remote and dispatch them to store
 * @param {string} lang current language ISO639
 */

export const listCategories = (lang: string) => async (dispatch: Dispatch) => {
  try {
    // Build url
    let url = API_URL + "/list-categories";
    const response = await axios.get(url);
    const data = response.data;
    const name_key = "name_" + lang;
    // Create recipe without details
    let categories: Array<Category> = new Array();
    for (const obj of data) {
      // Get name
      const name = obj[name_key];
      categories.push({
        id: obj.id,
        name: name,
      });
    }
    // Sort categories by name
    categories.sort((a, b) => {
      if (a.name < b.name) return -1;
      if (a.name > b.name) return 1;
      return 0;
    });
    dispatch({
      type: LIST_CATEGORIES,
      categories: categories,
    });
  } catch (error) {
    console.error("Could not get categories", error.message);
    throw error;
  }
};

/**
 * @function likeRecipe
 * @description like provided recipe; return updated recipe record
 * @param {string} lang current language ISO639
 * @param {Array<Category>} categories
 * @param {string} id recipe id
 */

export const likeRecipe = (
  lang: string,
  categories: Array<Category>,
  id: string
) => async (dispatch: Dispatch) => {
  try {
    // Build url
    let url = API_URL + "/like-recipe/" + id;
    const response = await axios.post(url);
    const data = response.data;
    // Get ingredients
    const ingredients: Array<Ingredient> = new Array();
    const ingredient_name_key = "name_" + lang;
    for (const ingredient of data.recipeIngredients) {
      ingredients.push({
        name: ingredient[ingredient_name_key],
        quantity: ingredient.quantity,
        measure: ingredient.measure,
      });
    }
    // Get categories
    let recipeCategories: Array<string> = new Array();
    for (const c of data.categories) {
      for (const cat of categories) {
        if (cat.id === c) {
          recipeCategories.push(cat.name);
        }
      }
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
      recipeCategories,
      data.date,
      data.images,
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

/**
 * @description fetch recipes
 * @param {string} lang ISO 639
 * @param {Array<Category>} categories
 * @param {string | undefined} title filter recipe by its title
 * @param {string | undefined} category category to filter result by
 * @param {string | undefined} orderBy order recipes by...
 * @param {number | undefined} limit results to...
 * @param {number | undefined} offset result offsets
 * @param {boolean} shuffle
 */

async function fetchRecipes(
  lang: string,
  categories: Array<Category>,
  title: string | undefined = undefined,
  category: string | undefined = undefined,
  orderBy: string | undefined = undefined,
  limit: number | undefined = undefined,
  offset: number | undefined = undefined,
  shuffle: boolean = false
) {
  try {
    // Build url
    let url = API_URL + "/list-recipes?";
    if (title) {
      url += "title=" + title + "&";
    }
    if (category) {
      url += "category=" + category + "&";
    }
    if (orderBy) {
      url += "orderBy=" + orderBy + "&";
    }
    if (limit) {
      url += "limit=" + limit + "&";
    }
    if (offset) {
      url += "offset=" + offset + "&";
    }
    if (shuffle) {
      url += "shuffle=1&";
    }
    const response = await axios.get(url);
    const recipesData = response.data;
    let recipes: Array<Recipe> = new Array();
    const titleKey = "title_" + lang;
    for (const recipe of recipesData) {
      // Get title
      const title = recipe[titleKey];
      // Get categories
      let recipeCategories: Array<string> = new Array();
      for (const c of recipe.categories) {
        for (const cat of categories) {
          if (cat.id === c) {
            recipeCategories.push(cat.name);
          }
        }
      }
      // Create recipe without details
      recipes.push(
        new Recipe(
          recipe.id,
          title,
          recipeCategories,
          recipe.date,
          recipe.images,
          null,
          null,
          null,
          recipe.likes
        )
      );
    }
    return recipes;
  } catch (error) {
    console.error("Could not fetch recipes", error.message);
    throw error;
  }
}
