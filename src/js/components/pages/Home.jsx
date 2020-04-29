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
//Layouts
const Recipe = React.lazy(() => import("../layouts/Recipe"));
//Pages
const About = React.lazy(() => import("./About"));
const Front = React.lazy(() => import("./Front"));
const Recipes = React.lazy(() => import("./Recipes"));

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      recipesLoaded: false
    };
  }

  componentDidMount() {
    this.props.fetchRecipes().then(() => {
      //Once recipes have been loaded, set recipes loaded to true
      this.setState({recipesLoaded: true});
    });
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
              <Route path="/recipe/" render={props => {
                //If recipes are not loaded yet, return Waiting
                if (!this.state.recipesLoaded) {
                  return (
                    <Waiting />
                  )
                }
                const locationTokens = props.location.pathname.split("/");
                const recipeId = locationTokens[locationTokens.length - 1];
                let recipe = null;
                for (const r of this.props.recipes) {
                  if (recipeId == r.id) {
                    recipe = r;
                  }
                }
                //Get related recipes (NOTE: max 3 recipes with at least one category in common)
                let relatedRecipes = [];
                for (const r of this.props.recipes) {
                  if (r.id === recipe.id) {
                    continue;
                  }
                  const found = r.category.some(i => recipe.category.indexOf(i) >= 0);
                  if (found) {
                    relatedRecipes.push(r);
                  }
                  if (relatedRecipes.length === 3) {
                    break;
                  }
                }
                return (
                  <Recipe recipe={recipe} related={relatedRecipes} />
                )
              }} />
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
