import React, { Component } from "react";
import { IntlProvider } from 'react-intl';

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


export default class App extends Component {
  render() {
    return (
      <IntlProvider locale={navigator.language}>
        <Provider store={store}>
          <Router>
            <div className="App">
              <Route
                exact
                path="/"
                render={(props) => (
                  <Home />
                )}
              />
            </div>
          </Router>
        </Provider>
      </IntlProvider>
    );
  }
}
