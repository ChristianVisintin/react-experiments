import React, { Component } from "react";
import ReactDOM from "react-dom";

//Css
import './App.css';

//Router
import { BrowserRouter as Router, Route, HashRouter } from "react-router-dom";

//Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";

//Components
import Menu from "./js/components/Menu";
//Pages
import About from "./js/components/pages/About";
import Home from "./js/components/pages/Home";
import Projects from "./js/components/pages/Projects";

export default class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route
              exact
              path="/"
              render={(props) => (
                <React.Fragment>
                  {/* Menu is for all pages in / */}
                  <Menu />
                  {/* HashRouter for page to display */}
                  <HashRouter>
                    <div>
                      <Route path="/about" component={About} />
                      <Route path="/home" component={Home} />
                      <Route path="/projects" component={Projects} />
                    </div>
                  </HashRouter>
                </React.Fragment>
              )}
            />
          </div>
        </div>
      </Router>
    );
  }
}
