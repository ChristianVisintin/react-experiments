/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import InfiniteScroll from "react-infinite-scroll-component";

//Actions
import { loadMoreRecipes, searchRecipes } from "../actions/recipeActions";

//Classes
import Recipe from "../lib/data/recipe";
import RecipeCard from "../components/RecipeCard";
import RecipeLoader from "../components/RecipeLoader";
import CategoryNav from "../components/CategoryNav";
import OrderByDropdown from "../components/OrderbyDropdown";
import { Category } from "../lib/data/category";
import { RootState } from "../store/index";
import { recipesOrderBy } from "../lib/misc/orderbychoice";
import GoTopArrow from "../components/GoTopArrow";

//Components
const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
  overflow-x: hidden !important;
`;

const hiddenScrollStyle = {
  overflowX: 'hidden' as 'hidden'
};

const RECIPES_LOADED = 9;

// Props
interface OwnProps {
  lang: string;
  categories: Array<Category>;
  search: string | null;
  resetSearch: Function;
}

interface DispatchProps {
  searchRecipes: Function;
  loadMoreRecipes: Function;
}

interface StateProps {
  recipes: Array<Recipe>;
}

type RecipesProps = StateProps & OwnProps & DispatchProps;

// States
interface OwnStates {
  category: string | undefined;
  recipesLoaded: boolean;
  orderBy: string;
  recipesLoadedAll: boolean;
}

class Recipes extends React.Component<RecipesProps, OwnStates> {
  static propTypes = {
    lang: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
    resetSearch: PropTypes.func.isRequired,
    search: PropTypes.string,
  };

  constructor(props: RecipesProps) {
    super(props);
    this.state = {
      category: "all",
      recipesLoaded: false,
      orderBy: "date",
      recipesLoadedAll: false,
    };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleCategoryReset = this.handleCategoryReset.bind(this);
    this.handleOrderBySelect = this.handleOrderBySelect.bind(this);
    this.loadMoreRecipes = this.loadMoreRecipes.bind(this);
  }

  componentDidMount() {
    this.reloadRecipes();
  }

  handleCategorySelect(e: string) {
    // Set category and reload recipes
    this.setState({ category: e }, this.reloadRecipes);
  }

  handleCategoryReset() {
    this.setState({ category: undefined }, this.reloadRecipes);
  }

  handleOrderBySelect(e: string) {
    // Set order by and reload recipes
    this.setState({ orderBy: e }, this.reloadRecipes);
  }

  render() {
    //Prepare recipe cards
    const recipeCards = this.state.recipesLoaded
      ? this.props.recipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))
      : this.createDummyContentLoader(RECIPES_LOADED);
    return (
      <Container fluid>
        <Row className="d-flex">
          <Col xs="12" md="auto" lg="10">
            <CategoryNav
              categories={this.props.categories}
              onCategorySelect={this.handleCategorySelect}
              onCategoryReset={this.handleCategoryReset}
            />
          </Col>
          <Col xs="12" md="auto" lg="2">
            <OrderByDropdown
              choices={recipesOrderBy}
              choice={this.state.orderBy}
              name="recipes.orderbyKey"
              onSelect={this.handleOrderBySelect}
            />
          </Col>
        </Row>
        <Row>
          <InfiniteScroll
            dataLength={recipeCards.length}
            next={this.loadMoreRecipes}
            hasMore={!this.state.recipesLoadedAll}
            loader={<RecipeLoader />}
            endMessage={<GoTopArrow />}
            style={hiddenScrollStyle}
          >
            <CardContainer className="row">{recipeCards}</CardContainer>
          </InfiniteScroll>
        </Row>
      </Container>
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
    const limit = RECIPES_LOADED; // NOTE: new recipes are appended to the end of the array
    this.props
      .searchRecipes(
        this.props.lang,
        this.props.categories,
        this.props.search ? this.props.search : undefined,
        this.state.category,
        this.state.orderBy,
        limit
      )
      .then(() => {
        //Once recipes have been loaded, set recipes loaded to true
        this.setState({ recipesLoaded: true, recipesLoadedAll: false });
      })
      .catch(() => {});
  }

  /**
   * @description load more recipes
   */

  loadMoreRecipes() {
    // Calculate offset
    const offset = this.props.recipes.length;
    const prevLength = this.props.recipes.length;
    const limit = RECIPES_LOADED; // NOTE: new recipes are appended to the end of the array
    this.props
      .loadMoreRecipes(
        this.props.lang,
        this.props.categories,
        this.props.search ? this.props.search : undefined,
        this.state.category,
        this.state.orderBy,
        limit,
        offset
      )
      .then(() => {
        // Check if all recipes has been loaded
        const allLoaded = prevLength === this.props.recipes.length;
        // Once recipes have been loaded, set recipes loaded to true
        this.setState({ recipesLoaded: true, recipesLoadedAll: allLoaded });
      })
      .catch(() => {});
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  recipes: state.recipes.recipes,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  searchRecipes: (
    lang: string,
    categories: Array<Category>,
    title: string | undefined = undefined,
    category: string | undefined = undefined,
    orderBy: string | undefined = undefined,
    limit: number
  ) =>
    dispatch(searchRecipes(lang, categories, title, category, orderBy, limit)),
  loadMoreRecipes: (
    lang: string,
    categories: Array<Category>,
    title: string | undefined = undefined,
    category: string | undefined = undefined,
    orderBy: string | undefined = undefined,
    limit: number,
    offset: number
  ) =>
    dispatch(
      loadMoreRecipes(lang, categories, title, category, orderBy, limit, offset)
    ),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
