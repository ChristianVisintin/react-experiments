/**
 * CookieStorage represents the cookies container for this application
 */

export default class CookieStorage {
  lang: string;
  cookiePolicyAccepted: boolean;

  /**
   * @description CookieStorage class constructor
   * @param lang 
   * @param cookiePolicyAccepted  
   */

  constructor(lang: string, cookiePolicyAccepted: boolean) {
    this.lang = lang;
    this.cookiePolicyAccepted = cookiePolicyAccepted;
  }
}
