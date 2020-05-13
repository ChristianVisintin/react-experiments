import { Dispatch } from 'redux';
import { FETCH_RECIPES } from "./types";

import Recipe from '../classes/recipe';

import axios, { AxiosResponse, AxiosError } from 'axios';

/**
 * @function fetchRecipes
 * @description fetch recipes on remote server and dispatch to store
 */

export const fetchRecipes = () => (dispatch: Dispatch) => {
  return axios
    .get("http://localhost:3000/recipes")
    .then((response: AxiosResponse) => {
      const recipesData = response.data;
      let recipes: Array<Recipe> = [];
      for (const recipe of recipesData) {
        recipes.push(new Recipe(recipe.id, recipe.title, recipe.category, recipe.date, recipe.img, recipe.body, recipe.tags));
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
    })
    .catch((error: AxiosError) => {
      console.error("Could not fetch recipes", error.message);
      dispatch({
        type: FETCH_RECIPES,
        payload: [],
      });
    });
};
