import React from "react";
import { HashRouter, Route } from "react-router-dom";

//Components
import Menu from "../layouts/Menu";
import Footer from "../layouts/Footer";
import Waiting from "../Waiting";
//Pages
const About = React.lazy(() => import("./About"));
const Front = React.lazy(() => import("./Front"));
const Recipes = React.lazy(() => import("./Recipes"));

export default function Home() {
  return (
    <React.Fragment>
      {/* Menu is for all pages in / */}
      <Menu />
      {/* HashRouter for page to display */}
      <HashRouter>
        <main className="page-content">
          <React.Suspense fallback={<Waiting />}>
            <Route path="/about" component={About} />
            <Route path="/home" component={Front} />
            <Route exact path="/" component={Front} />
            <Route path="/recipes" component={Recipes} />
          </React.Suspense>
        </main>
      </HashRouter>
      {/*Footer is visible for all pages in / */}
      <Footer />
    </React.Fragment>
  );
}
