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

//Actions
import { exploreRecipes } from "../actions/recipeActions";

//Classes
import Recipe from "../lib/data/recipe";
import RecipeCard from "../components/RecipeCard";
import RecipeLoader from "../components/RecipeLoader";
import CategoryNav from "../components/CategoryNav";
import OrderByDropdown from "../components/OrderbyDropdown";
import { Category } from "../lib/data/category";
import { RootState } from "../store/index";
import { recipesOrderBy } from "../lib/misc/orderbychoice";

//Components
const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const RECIPES_LOADED = 9;

// Props
interface OwnProps {
  lang: string;
  categories: Array<Category>;
  search: string | null;
  searchHnd: Function;
  resetSearch: Function;
}

interface DispatchProps {
  exploreRecipes: Function;
}

interface StateProps {
  recipes: Array<Recipe>;
}

type RecipesProps = StateProps & OwnProps & DispatchProps;

// States
interface OwnStates {
  category: string | undefined;
  recipesLoaded: Boolean;
  orderBy: string;
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
    this.state = { category: "all", recipesLoaded: false, orderBy: "date" };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleCategoryReset = this.handleCategoryReset.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleOrderBySelect = this.handleOrderBySelect.bind(this);
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

  handleSearch(title: string) {
    this.props.searchHnd(title);
  }

  handleOrderBySelect(e: string) {
    // Set order by and reload recipes
    this.setState({ orderBy: e }, this.reloadRecipes);
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
          <CardContainer className="row">{recipeCards}</CardContainer>
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

  reloadRecipes(offset: number = 0) {
    const limit = RECIPES_LOADED; // NOTE: new recipes are appended to the end of the array
    this.props
      .exploreRecipes(
        this.props.lang,
        this.props.categories,
        undefined, // TODO: add search
        //this.props.search,
        this.state.category,
        this.state.orderBy,
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
  recipes: state.explorerRecipes.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  exploreRecipes: (
    lang: string,
    categories: Array<Category>,
    title: string | undefined = undefined,
    category: string | undefined = undefined,
    orderBy: string | undefined = undefined,
    limit: number,
    offset: number
  ) =>
    dispatch(
      exploreRecipes(
        lang,
        categories,
        title,
        category,
        orderBy,
        limit,
        offset
      )
    ),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Recipes);
