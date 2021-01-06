/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React, { Component } from "react";
import { IntlProvider } from "react-intl";
import { flatten } from "flat";

//Css
import "./App.scss";
//Redux
import { Provider } from "react-redux";
import Store from "./js/store/index";

// Utils
import { getNavigatorLanguage } from "./js/lib/utils/utils";

//Bootstrap CSS (@! Use CDN instead - see index.html)
//import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import Home from "./js/pages/Home";

//Translations

import Translations from "./js/lib/misc/translations";

import enTranslations from "./lang/en.json";
import itTranslations from "./lang/it.json";
//Build translations object
const translations: Translations = {
  en: flatten(enTranslations),
  it: flatten(itTranslations),
};

/**
 * @description get default language
 * @returns {string} lang ISO639
 */

export function getDefaultLanguage() {
  let lang = getNavigatorLanguage();
  if (lang in translations) {
    return lang;
  } else {
    return 'en';
  }
}

// Get language
const language = getDefaultLanguage();

export default class App extends Component<{}, {}> {
  render() {
    return (
      <Provider store={Store}>
        <IntlProvider locale={language} messages={translations[language]}>
          <Home lang={language} />
        </IntlProvider>
      </Provider>
    );
  }
}
