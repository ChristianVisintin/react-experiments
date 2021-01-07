/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import Recipe from "../lib/data/recipe";
import OpenType from "../lib/utils/opentype";

export class GenericStoreState {
  items: any;
  item: any;

  constructor(items: any, item: any) {
    this.items = items;
    this.item = item;
  }
}

export class RecipeStoreState {
  recipes: Array<Recipe>;
  recipe: Recipe;
  latestRecipes: Array<Recipe>;
  relatedRecipes: Array<Recipe>;
  carouselRecipes: Array<Recipe>;

  constructor(
    recipes: Array<Recipe>,
    recipe: Recipe,
    latestRecipes: Array<Recipe>,
    relatedRecipes: Array<Recipe>,
    carouselRecipes: Array<Recipe>
  ) {
    this.recipes = recipes;
    this.recipe = recipe;
    this.latestRecipes = latestRecipes;
    this.relatedRecipes = relatedRecipes;
    this.carouselRecipes = carouselRecipes;
  }
}

export interface ActionMessage {
  type: string;
  payload: OpenType;
}
