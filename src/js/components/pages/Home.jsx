import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { fetchRecipes } from "../../actions/recipeActions";

//Components
import Menu from "../layouts/Menu";
import Footer from "../layouts/Footer";
import Waiting from "../Waiting";
//Pages
const About = React.lazy(() => import("./About"));
const Front = React.lazy(() => import("./Front"));
const Recipes = React.lazy(() => import("./Recipes"));

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    return (
      <React.Fragment>
        {/* Menu is for all pages in / */}
        <Menu />
        {/* HashRouter for page to display */}
        <HashRouter>
          <main className="page-content">
            <React.Suspense fallback={<Waiting />}>
              <Route path="/about" component={About} />
              <Route path="/home" render={props => (<Front recipes={this.props.recipes} /> )} />
              <Route exact path="/" render={props => (<Front recipes={this.props.recipes} /> )} />
              <Route path="/recipes" render={props => (<Recipes recipes={this.props.recipes} />)} />
            </React.Suspense>
          </main>
        </HashRouter>
        {/*Footer is visible for all pages in / */}
        <Footer recipes={this.props.recipes} />
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.items,
});

export default connect(mapStateToProps, { fetchRecipes })(Home);
