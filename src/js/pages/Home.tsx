/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { injectIntl } from "react-intl";

//Actions
import { fetchRecipes } from "../actions/recipeActions";
import { getCookies, acceptCookiePolicy } from "../actions/cookiesActions";

//Components
import Menu from "../layouts/Menu";
import Footer from "../layouts/Footer";
import CookieAlert from "../layouts/CookieAlert";
import Waiting from "../components/Waiting";
//Layouts
const RecipeTemplate = React.lazy(() => import("../layouts/RecipeView"));
//Pages
const About = React.lazy(() => import("./About"));
const Front = React.lazy(() => import("./Front"));
const Recipes = React.lazy(() => import("./Recipes"));
const CookiePolicy = React.lazy(() => import("./CookiePolicy"));

//Classes
import Recipe from "../lib/data/recipe";
import CookieStorage from "../lib/misc/cookie_storage";
import { RootState } from "../store/index";

interface OwnProps {}

interface DispatchProps {
  fetchRecipes: Function;
  getCookies: Function;
}

interface OwnStates {
  userSearch: string | null;
  recipesLoaded: Boolean;
}

interface StateProps {
  cookies: CookieStorage | undefined;
  recipes: Array<Recipe>;
}

type HomeProps = StateProps & OwnProps & DispatchProps;

class Home extends React.Component<HomeProps, OwnStates> {

  constructor(props: HomeProps) {
    super(props);
    this.state = {
      recipesLoaded: false,
      userSearch: null,
    };
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.toggleCookiePolicy = this.toggleCookiePolicy.bind(this);
  }

  componentDidMount() {
    this.props
      .fetchRecipes()
      .then(() => {
        //Once recipes have been loaded, set recipes loaded to true
        this.setState({ recipesLoaded: true });
      })
      .catch(() => {
        this.setState({ recipesLoaded: true });
      });
    this.props.getCookies();
  }

  /**
   * @description go to search layout
   * @param {String} subject
   */

  search(subject: string) {
    subject = subject.toLowerCase();
    this.setState({ userSearch: subject });
    //Move to recipes
    window.location.href = "/#/recipes";
  }

  /**
   * @description reset search
   */

  resetSearch() {
    //Reset search
    this.setState({ userSearch: null });
  }

  /**
   * @description show or hide the cookie policy based on its current value
   */
  toggleCookiePolicy() {
    window.location.href = "/#/cookies";
  }

  /**
   * @description Get hash final token from location
   * @param {String} url
   * @returns {String}
   */

  getHash(url: string): string {
    const locationTokens = url.split("/");
    return locationTokens[locationTokens.length - 1];
  }

  render() {
    //Display cookie alert only when context value is false
    const cookies = this.props.cookies;
    const cookieAlert = cookies ? (
      "cookiePolicyAccepted" in cookies ? (
        cookies.cookiePolicyAccepted ? null : (
          <CookieAlert
            acceptCookiePolicy={acceptCookiePolicy}
            showCookiePolicy={this.toggleCookiePolicy}
          />
        )
      ) : (
        <CookieAlert
          acceptCookiePolicy={acceptCookiePolicy}
          showCookiePolicy={this.toggleCookiePolicy}
        />
      )
    ) : null;
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
              <Route
                path="/home"
                render={(props) => <Front recipes={this.props.recipes} />}
              />
              <Route
                exact
                path="/"
                render={(props) => <Front recipes={this.props.recipes} />}
              />
              <Route
                path="/recipes"
                render={(props) => (
                  <Recipes
                    recipes={this.props.recipes}
                    searchHnd={this.search}
                    search={this.state.userSearch}
                    resetSearch={this.resetSearch}
                  />
                )}
              />
              <Route
                path="/recipe/"
                render={(props) => {
                  //If recipes are not loaded yet, return Waiting
                  if (!this.state.recipesLoaded) {
                    return <Waiting />;
                  }
                  const recipeId = this.getHash(props.location.pathname);
                  let recipe: Recipe = new Recipe(
                    "-1",
                    "",
                    [],
                    "1970-01-01T00:00:00Z",
                    [],
                    "",
                    []
                  );
                  for (const r of this.props.recipes) {
                    if (recipeId === r.id.toString()) {
                      recipe = r;
                    }
                  }
                  //Get related recipes (NOTE: max 3 recipes with at least one category in common)
                  let relatedRecipes = [];
                  for (const r of this.props.recipes) {
                    if (recipe === null) {
                      break;
                    }
                    if (r.id === recipe.id) {
                      continue;
                    }
                    const found = r.category.some(
                      (i) => recipe.category.indexOf(i) >= 0
                    );
                    if (found) {
                      relatedRecipes.push(r);
                    }
                    if (relatedRecipes.length === 3) {
                      break;
                    }
                  }
                  return (
                    <RecipeTemplate recipe={recipe} related={relatedRecipes} />
                  );
                }}
              />
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

const mapStateToProps = (state: RootState): StateProps => ({
  recipes: state.recipes.items,
  cookies: state.cookies.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchRecipes: () => dispatch(fetchRecipes()),
  getCookies: () => dispatch(getCookies()),
});

export default injectIntl(
  connect<StateProps, DispatchProps, OwnProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
