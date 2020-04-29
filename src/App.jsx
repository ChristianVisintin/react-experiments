import React, { Component } from "react";
import ReactDOM from "react-dom";

//Css
import "./App.css";

//Router
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";
//Redux
import { Provider } from "react-redux";
import store from "./js/store/index";
//Bootstrap CSS
//import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Menu from "./js/components/layouts/Menu";
import Footer from "./js/components/layouts/Footer";
//Pages
import About from "./js/components/pages/About";
import Home from "./js/components/pages/Home";
import Recipes from "./js/components/pages/Recipes";

export default class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className="App">
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  {/* Menu is for all pages in / */}
                  <Menu />
                  {/* HashRouter for page to display */}
                  <HashRouter>
                    <main className="page-content">
                      <Route path="/about" component={About} />
                      <Route path="/home" component={Home} />
                      <Route exact path="/" component={Home} />
                      <Route path="/recipes" component={Recipes} />
                    </main>
                  </HashRouter>
                  {/*Footer is visible for all pages in / */}
                  <Footer />
                </React.Fragment>
              )}
            />
          </div>
        </Router>
      </Provider>
    );
  }
}
