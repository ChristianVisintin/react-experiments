import { Dispatch } from 'redux';

import { ACCEPT_COOKIE_POLICY, GET_COOKIES, SET_LANGUAGE } from "./types";

import Cookies from 'js-cookie';

const policyCookie = "cookiePolicyAccepted";
const langCookie = "lang";

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
    payload: true
  });
};

/**
 * @function setLanguage
 * @description set language to cookies
 * @param {String} lang 
 */

export const setLanguage = (lang: String) => (dispatch: Dispatch) => {
  if (Cookies.get(policyCookie) !== undefined) {
    Cookies.set(langCookie, lang, { expires: 365 });
  }
  dispatch({
    type: SET_LANGUAGE,
    payload: lang
  });
};

export const getCookies = () => (dispatch: Dispatch) => {
  const cookies = {
    lang: Cookies.get(langCookie),
    cookiePolicyAccepted: Cookies.get(policyCookie)
  };
  dispatch({
    type: GET_COOKIES,
    payload: cookies
  });
};
