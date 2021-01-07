/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { HashRouter, Route } from "react-router-dom";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { injectIntl, WrappedComponentProps } from "react-intl";
import styled from "styled-components";

//Actions
import { getCarouselRecipes, listCategories } from "../actions/recipeActions";
import { getCookies, acceptCookiePolicy } from "../actions/cookiesActions";

//Components
import Menu from "../layouts/Menu";
import Footer from "../layouts/Footer";
import CookieAlert from "../layouts/CookieAlert";
import Waiting from "../components/Waiting";
//Layouts
const RecipeTemplate = React.lazy(() => import("./RecipeInfo"));
//Pages
const About = React.lazy(() => import("./About"));
const MainPage = React.lazy(() => import("./MainPage"));
const Recipes = React.lazy(() => import("./Recipes"));
const CookiePolicy = React.lazy(() => import("./CookiePolicy"));

//Classes
import Recipe from "../lib/data/recipe";
import CookieStorage from "../lib/misc/cookie_storage";
import { RootState } from "../store/index";
import { Category } from "../lib/data/category";

//Components

const PageWrapper = styled.div`
  width: 100%;
  overflow-y: auto;
  padding-bottom: 5rem; /* Must match footer height */
`;

interface OwnProps {
  lang: string;
}

interface DispatchProps {
  getCarouselRecipes: Function;
  listCategories: Function;
  getCookies: Function;
}

interface StateProps {
  cookies: CookieStorage | undefined;
  categories: Array<Category>;
  recipes: Array<Recipe>;
}

type HomeProps = StateProps & OwnProps & DispatchProps;

interface OwnStates {
  userSearch: string | null;
  recipesLoaded: boolean;
  categoriesLoaded: boolean;
}

class Home extends React.Component<HomeProps, OwnStates> {
  constructor(props: HomeProps) {
    super(props);
    this.state = {
      recipesLoaded: false,
      userSearch: null,
      categoriesLoaded: false,
    };
    this.search = this.search.bind(this);
    this.resetSearch = this.resetSearch.bind(this);
    this.toggleCookiePolicy = this.toggleCookiePolicy.bind(this);
  }

  componentDidMount() {
    this.props.getCookies();
    // Get categories first
    this.props.listCategories(this.props.lang).then(() => {
      this.setState({ categoriesLoaded: true });
      // Load 3 random recipes for the slideshow
      this.props
        .getCarouselRecipes(this.props.lang, this.props.categories, 3) // shuffle, only 3 results
        .then(() => {
          //Once recipes have been loaded, set recipes loaded to true
          this.setState({ recipesLoaded: true });
        });
    });
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
          <main>
            <PageWrapper>
              <React.Suspense fallback={<Waiting />}>
                <Route path="/about" component={About} />
                <Route path="/cookies" component={CookiePolicy} />
                <Route
                  path="/home"
                  render={(props) => (
                    <MainPage
                      recipes={
                        this.state.recipesLoaded ? this.props.recipes : []
                      }
                    />
                  )}
                />
                <Route
                  exact
                  path="/"
                  render={(props) => (
                    <MainPage
                      recipes={
                        this.state.recipesLoaded ? this.props.recipes : []
                      }
                    />
                  )}
                />
                <Route
                  path="/recipes"
                  render={(props) => (
                    <Recipes
                      lang={this.props.lang}
                      categories={
                        this.state.categoriesLoaded ? this.props.categories : []
                      }
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
                    return (
                      <RecipeTemplate
                        recipeId={recipeId}
                        lang={this.props.lang}
                        categories={this.props.categories}
                      />
                    );
                  }}
                />
              </React.Suspense>
            </PageWrapper>
          </main>
        </HashRouter>
        {/*Footer is visible for all pages in / */}
        <Footer
          lang={this.props.lang}
          categories={this.state.categoriesLoaded ? this.props.categories : []}
        />
        {/*Cookie alert and policy are rendered based on the context value*/}
        {cookieAlert}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  recipes: state.homeRecipes.items,
  categories: state.categories.items,
  cookies: state.cookies.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  getCarouselRecipes: (
    lang: string,
    categories: Array<Category>,
    limit: number
  ) => dispatch(getCarouselRecipes(lang, categories, limit)),
  listCategories: (lang: string) => dispatch(listCategories(lang)),
  getCookies: () => dispatch(getCookies()),
});

export default injectIntl(
  connect<StateProps, DispatchProps, OwnProps & WrappedComponentProps>(
    mapStateToProps,
    mapDispatchToProps
  )(Home)
);
