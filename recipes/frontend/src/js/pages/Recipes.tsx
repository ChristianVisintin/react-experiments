/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Nav } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

//Actions
import { fetchRecipes } from "../actions/recipeActions";

//Classes
import Recipe from "../lib/data/recipe";
import RecipeCard from "../components/RecipeCard";
import RecipeLoader from "../components/RecipeLoader";
import { Category } from "../lib/data/category";
import { RootState } from "../store/index";

//Components
const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

// Props
interface OwnProps {
  lang: string;
  categories: Array<Category>;
  search: string | null;
  searchHnd: Function;
  resetSearch: Function;
}

interface DispatchProps {
  fetchRecipes: Function;
}

interface StateProps {
  recipes: Array<Recipe>;
}

type RecipesProps = StateProps & OwnProps & DispatchProps;

// States
interface OwnStates {
  category: string | undefined;
  recipesLoaded: Boolean;
}

class Recipes extends React.Component<RecipesProps, OwnStates> {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    resetSearch: PropTypes.func.isRequired,
    searchHnd: PropTypes.func.isRequired,
    search: PropTypes.string,
  };

  constructor(props: RecipesProps) {
    super(props);
    this.state = { category: "all", recipesLoaded: false };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.reloadRecipes();
  }

  handleCategorySelect(e: string) {
    // Set category and reload recipes
    this.setState({ category: e }, this.reloadRecipes);
  }

  handleSearch(title: string) {
    this.props.searchHnd(title);
  }

  render() {
    //Prepare recipe cards
    const recipeCards = this.state.recipesLoaded
      ? this.props.recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            handleSearch={this.handleSearch}
            recipe={recipe}
          />
        ))
      : this.createDummyContentLoader(18);
    // Prepare categories
    const categoriesNav = this.props.categories.map((category) => (
      <Nav.Item key={category.id}>
        <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
      </Nav.Item>
    ));
    return (
      <React.Fragment>
        <Nav
          className="justify-content-center"
          activeKey="all"
          onSelect={(ev) => {
            if (ev) {
              this.handleCategorySelect(ev);
            }
          }}
        >
          {categoriesNav}
          <Nav.Item>
            <Nav.Link
              hidden={this.props.search === null}
              onClick={(ev: any) => this.props.resetSearch()}
            >
              <Badge variant="secondary">
                {this.props.search}&nbsp;
                <Badge variant="light">X</Badge>
              </Badge>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <CardContainer className="row">{recipeCards}</CardContainer>
      </React.Fragment>
    );
  }

  /**
   * @description create a list of Recipe content loaders
   * @param {number} size
   * @return {Array<typeof RecipeLoader>}
   */

  createDummyContentLoader(size: number): Array<typeof RecipeLoader> {
    let container = new Array();
    for (let i = 0; i < size; i++) {
      container.push(<RecipeLoader key={i} />);
    }
    return container;
  }

  /**
   * @description reload recipes
   */

  reloadRecipes() {
    const limit = this.state.recipesLoaded
      ? this.props.recipes.length + 18
      : 18; // FIXME: should always be 18, but append to array
    const offset = this.state.recipesLoaded ? this.props.recipes.length : 0;
    this.props
      .fetchRecipes(
        this.props.lang,
        this.props.categories,
        this.props.search,
        this.state.category,
        "date",
        limit,
        offset
      )
      .then(() => {
        //Once recipes have been loaded, set recipes loaded to true
        this.setState({ recipesLoaded: true });
      })
      .catch(() => {});
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  recipes: state.recipes.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchRecipes: (
    lang: string,
    categories: Array<Category>,
    title: string | undefined = undefined,
    category: string | undefined = undefined,
    orderBy: string | undefined = undefined,
    limit: number | undefined = undefined,
    offset: number | undefined = undefined
  ) =>
    dispatch(
      fetchRecipes(lang, categories, title, category, orderBy, limit, offset)
    ),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
