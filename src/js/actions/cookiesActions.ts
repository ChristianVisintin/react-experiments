import { Dispatch } from 'redux';

import { ACCEPT_COOKIE_POLICY, GET_COOKIES, SET_LANGUAGE } from "./types";

import Cookies from 'js-cookie';

const policyCookie = "cookiePolicyAccepted";
const langCookie = "lang";

import CookieStorage from "../classes/cookieStorage";

/**
 * @function acceptCookiePolicy
 * @description Accept cookie policy
 */

export const acceptCookiePolicy = () => (dispatch: Dispatch) => {
  //Set cookie policy state
  Cookies.set(policyCookie, 'true', { expires: 365 });
  //Dispatch events
  dispatch({
    type: ACCEPT_COOKIE_POLICY,
    payload: new CookieStorage(Cookies.get(langCookie), Cookies.get(policyCookie) !== undefined)
  });
};

/**
 * @function setLanguage
 * @description set language to cookies
 * @param {String} lang 
 */

export const setLanguage = (lang: string) => (dispatch: Dispatch) => {
  if (Cookies.get(policyCookie) !== undefined) {
    Cookies.set(langCookie, lang, { expires: 365 });
  }
  dispatch({
    type: SET_LANGUAGE,
    payload: new CookieStorage(Cookies.get(langCookie), Cookies.get(policyCookie) !== undefined)
  });
};

export const getCookies = () => (dispatch: Dispatch) => {
  const cookies = new CookieStorage(Cookies.get(langCookie), Cookies.get(policyCookie) !== undefined);
  dispatch({
    type: GET_COOKIES,
    payload: cookies
  });
};
