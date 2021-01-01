/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React, { Component } from "react";
import { IntlProvider } from 'react-intl';
import { flatten } from "flat";

//Css
import "./App.scss";
//Redux
import { Provider } from "react-redux";
import Store from "./js/store/index";

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

export default class App extends Component<{}, {}> {
  render() {
    return (
      <Provider store={Store}>
        <IntlProvider locale='it' messages={translations.it}>
          <Home />
        </IntlProvider>
      </Provider>
    );
  }
}
