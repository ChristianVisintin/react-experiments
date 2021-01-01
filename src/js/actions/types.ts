export const FETCH_RECIPES: string = 'FETCH_RECIPES';
export const NEWSLETTER_SUBSCRIBE: string = 'NEWSLETTER_SUBSCRIBE';
//Cookies
export const ACCEPT_COOKIE_POLICY: string = 'ACCEPT_COOKIE_POLICY';
export const GET_COOKIES: string = 'GET_COOKIES';
export const SET_LANGUAGE: string = 'SET_LANGUAGE';

export interface ActionMessage {
  type: string
  payload: any
}
