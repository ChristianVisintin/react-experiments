/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Nav } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

//Classes
import Recipe from "../lib/data/recipe";
import RecipeCard from "../components/RecipeCard";

//Components
const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

export interface RecipesProps {
  recipes: Array<Recipe>;
  search: string | null;
  searchHnd: Function;
  resetSearch: Function;
}

export interface RecipesStates {
  category: string;
}

export default class Recipes extends React.Component<
  RecipesProps,
  RecipesStates
> {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
    resetSearch: PropTypes.func.isRequired,
    searchHnd: PropTypes.func.isRequired,
    search: PropTypes.string,
  };

  constructor(props: RecipesProps) {
    super(props);
    this.state = { category: "all" };
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleHashtagSearch = this.handleHashtagSearch.bind(this);
  }

  handleCategorySelect(e: string) {
    this.setState({ category: e });
  }

  handleHashtagSearch(hashtag: string) {
    this.props.searchHnd(hashtag);
  }

  render() {
    //Prepare recipes to display
    let filteredRecipes = this.props.recipes.filter((item) => {
      //If category is all, don't check, otherwise check if category is in recipe category list
      return this.state.category === "all"
        ? item
        : item.category.includes(this.state.category);
    });
    //If search is NOT null, search for a recipe
    if (this.props.search) {
      const searched = this.props.search.startsWith("#")
        ? this.props.search.substring(1)
        : this.props.search;
      filteredRecipes = filteredRecipes.filter((item) => {
        //Check if search is contained in name or in tags
        const name = item.title.toLowerCase();
        const inHashTags = item.tags.includes(searched);
        return name.includes(searched) || inHashTags;
      });
    }
    //Prepare recipe cards
    const recipeCards = filteredRecipes.map((recipe) => (
      <RecipeCard
        key={recipe.id}
        handleHashtagSearch={this.handleHashtagSearch}
        recipe={recipe}
      />
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
          <Nav.Item>
            <Nav.Link eventKey="all">
              <FormattedMessage id="recipes.categories.all" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="breakfast">
              <FormattedMessage id="recipes.categories.breakfast" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lunch">
              <FormattedMessage id="recipes.categories.lunch" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dinner">
              <FormattedMessage id="recipes.categories.dinner" />
            </Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dessert">
              <FormattedMessage id="recipes.categories.dessert" />
            </Nav.Link>
          </Nav.Item>
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
}
