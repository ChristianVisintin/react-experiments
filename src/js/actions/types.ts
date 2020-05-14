export const FETCH_RECIPES: string = 'FETCH_RECIPES';
export const NEWSLETTER_SUBSCRIBE: string = 'NEWSLETTER_SUBSCRIBE';
//Cookies
export const ACCEPT_COOKIE_POLICY: string = 'ACCEPT_COOKIE_POLICY';
export const GET_COOKIES: string = 'GET_COOKIES';
export const SET_LANGUAGE: string = 'SET_LANGUAGE';

import CookieStorage from "../classes/cookieStorage";
import Recipe from "../classes/recipe";

export interface ActionMessage {
  type: string
  payload: any
}

export interface RecipeMessage {
  type: string,
  payload: Array<Recipe>
}

export interface CookiesMessage {
  type: string,
  payload: CookieStorage
}
