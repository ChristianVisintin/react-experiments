import { FETCH_RECIPES } from './types';

const axios = require('axios').default;

/**
 * @function fetchRecipes
 * @description fetch recipes on remote server and dispatch to store
 */

export const fetchRecipes = () => dispatch => {
  axios.get("http://localhost:3000/recipes").then((response) => {
    const recipes = response.data;
    dispatch({
      type: FETCH_RECIPES,
      payload: recipes
    })
  }).catch((error) => {
    console.error("Could not fetch recipes", error.data);
    dispatch({
      type: FETCH_RECIPES,
      payload: []
    })
  })
}
