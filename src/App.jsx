import React, { Component } from "react";
import { flatten } from 'flat';

//Css
import "./App.css";
//Redux
import { Provider } from "react-redux";
import store from "./js/store/index";

//Bootstrap CSS (@! Use CDN instead - see index.html)
//import "bootstrap/dist/css/bootstrap.min.css";

//Pages
import Index from "./js/components/pages/Index";

//Translations
import enTranslations from "./lang/en.json";
import itTranslations from "./lang/it.json";
//Build translations object
const translations = {
  'en': flatten(enTranslations),
  'it': flatten(itTranslations)
};

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Index translations={translations}/>
      </Provider>
    );
  }
}
