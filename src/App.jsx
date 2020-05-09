import React, { Component } from "react";
import { IntlProvider } from 'react-intl';
import { flatten } from 'flat';

//Css
import "./App.css";

//Router
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./js/store/index";

//Bootstrap CSS (@! Use CDN instead - see index.html)
//import "bootstrap/dist/css/bootstrap.min.css";

//Components

//Pages
import Home from "./js/components/pages/Home";

//Translations
import enTranslations from "./lang/en.json";
import itTranslations from "./lang/it.json";
const language = navigator.language.split(/[-_]/)[0]; // language without region code
//Build translations object
const translations = {
  'en': flatten(enTranslations),
  'it': flatten(itTranslations)
};

export default class App extends Component {
  render() {
    return (
      <IntlProvider locale={language} messages={translations[language]}>
        <Provider store={store}>
          <Router>
            <div className="App">
              <Route exact path="/" component={Home} />
            </div>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}
