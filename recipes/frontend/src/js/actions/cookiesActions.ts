/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import { v4 as uuidv4 } from "uuid";
import { Dispatch } from "redux";
import Cookies from "js-cookie";

import CookieStorage from "../lib/misc/cookie_storage";
import { getNavigatorLanguage } from "../lib/utils/utils";

// Action names
export const ACCEPT_COOKIE_POLICY: string = uuidv4();
export const GET_COOKIES: string = uuidv4();
export const SET_LANGUAGE: string = uuidv4();

// Cookie names
const policyCookie = "cookiePolicyAccepted";
const langCookie = "lang";

/**
 * @function acceptCookiePolicy
 * @description Accept cookie policy
 */

export const acceptCookiePolicy = () => (dispatch: Dispatch) => {
  //Set cookie policy state
  Cookies.set(policyCookie, "true", { expires: 365 });
  //Dispatch events
  dispatch({
    type: ACCEPT_COOKIE_POLICY,
    payload: getCookieStorage(),
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
    payload: getCookieStorage(),
  });
};

export const getCookies = () => (dispatch: Dispatch) => {
  dispatch({
    type: GET_COOKIES,
    payload: getCookieStorage(),
  });
};

/**
 * @description Get cookie storage from cookies
 * @returns {CookieStorage}
 */

function getCookieStorage(): CookieStorage {
  const lang = Cookies.get(langCookie);
  return new CookieStorage(
    lang ? lang : getNavigatorLanguage(),
    Cookies.get(policyCookie) !== undefined
  );
}
