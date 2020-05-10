import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { fetchRecipes } from "../../actions/recipeActions";
import { getCookies } from "../../actions/cookiesActions";

//Components
import Menu from "../layouts/Menu";
import Footer from "../layouts/Footer";
import CookieAlert from "../layouts/CookieAlert";
import Waiting from "../Waiting";
//Layouts
const Recipe = React.lazy(() => import("../layouts/Recipe"));
//Pages
const About = React.lazy(() => import("./About"));
const Front = React.lazy(() => import("./Front"));
const Recipes = React.lazy(() => import("./Recipes"));
const CookiePolicy = React.lazy(() => import("./CookiePolicy"));

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      recipesLoaded: false,
      userSearch: null
    };
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.toggleCookiePolicy = this.toggleCookiePolicy.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes().then(() => {
      //Once recipes have been loaded, set recipes loaded to true
      this.setState({recipesLoaded: true});
    });
    this.props.getCookies();
  }

  /**
   * @description go to search layout
   * @param {String} subject 
   */

  search(subject) {
    subject = subject.toLowerCase();
    this.setState({userSearch: subject});
    //Move to recipes
    window.location = "/#/recipes";
  }

  /**
   * @description reset search
   */

  resetSearch() {
    //Reset search
    this.setState({userSearch: null});
  }

  /**
   * @description show or hide the cookie policy based on its current value
   */
  toggleCookiePolicy() {
    window.location = "/#/cookies";
  }

  /**
   * @description Get hash final token from location
   * @param {String} url 
   */

  getHash(url) {
    const locationTokens = url.split("/");
    return locationTokens[locationTokens.length - 1];
  }

  render() {
    //Display cookie alert only when context value is false
    const cookies = this.props.cookies;
    const cookieAlert = ("cookiePolicyAccepted" in cookies) ? (cookies.cookiePolicyAccepted ? null : (
      <CookieAlert showCookiePolicy={this.toggleCookiePolicy} />
    )) : <CookieAlert showCookiePolicy={this.toggleCookiePolicy} />;
    return (
      <React.Fragment>
        {/* Menu is for all pages in / */}
        <Menu searchHnd={this.search} />
        {/* HashRouter for page to display */}
        <HashRouter>
          <main className="page-content">
            <React.Suspense fallback={<Waiting />}>
              <Route path="/about" component={About} />
              <Route path="/cookies" component={CookiePolicy} />
              <Route path="/home" render={props => (<Front recipes={this.props.recipes} /> )} />
              <Route exact path="/" render={props => (<Front recipes={this.props.recipes} /> )} />
              <Route path="/recipes" render={props => (<Recipes recipes={this.props.recipes} searchHnd={this.search} search={this.state.userSearch} resetSearch={this.resetSearch} />)} />
              <Route path="/recipe/" render={props => {
                //If recipes are not loaded yet, return Waiting
                if (!this.state.recipesLoaded) {
                  return (
                    <Waiting />
                  )
                }
                const recipeId = this.getHash(props.location.pathname);
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
        {/*Cookie alert and policy are rendered based on the context value*/}
        {cookieAlert}
      </React.Fragment>
    );
  }
}

Home.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
  cookies: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.items,
  cookies: state.cookies.items
});

const mapDispatchToProps = (dispatch) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  getCookies: () => dispatch(getCookies())
});

export default connect(mapStateToProps,  mapDispatchToProps)(Home);
