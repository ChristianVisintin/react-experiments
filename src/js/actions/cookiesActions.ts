import { Dispatch } from 'redux';

import { ACCEPT_COOKIE_POLICY, GET_COOKIES, SET_LANGUAGE } from "./types";

import Cookies from 'js-cookie';

const policyCookie = "cookiePolicyAccepted";
const langCookie = "lang";

import CookieStorage from "../classes/cookieStorage";

import { getNavigatorLanguage } from "../utils";

/**
 * @function acceptCookiePolicy
 * @description Accept cookie policy
 */

export const acceptCookiePolicy = () => (dispatch: Dispatch) => {
  console.log("ACCEPT");
  //Set cookie policy state
  Cookies.set(policyCookie, 'true', { expires: 365 });
  //Dispatch events
  const lang = Cookies.get(langCookie);
  dispatch({
    type: ACCEPT_COOKIE_POLICY,
    payload: new CookieStorage(lang ? lang : "en", Cookies.get(policyCookie) !== undefined)
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
    payload: new CookieStorage(lang, Cookies.get(policyCookie) !== undefined)
  });
};

export const getCookies = () => (dispatch: Dispatch) => {
  const lang = Cookies.get(langCookie);
  const cookies = new CookieStorage(lang ? lang : getNavigatorLanguage(), Cookies.get(policyCookie) !== undefined);
  dispatch({
    type: GET_COOKIES,
    payload: cookies
  });
};
