import React from "react";
import { Badge, Card, Nav, Row } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedDate, FormattedMessage } from "react-intl";

//Classes
import Recipe from "../../classes/recipe";

//Components

const CardLink = styled.a`
  text-decoration: none;
  color: #303030;
  :hover {
    text-decoration: none;
    color: #303030;
  }
`;

const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`;

const RecipeCard = styled(Card)`
  margin-top: 2em;
`;

const RecipeHashTagContainer = styled(Row)`
  margin-left: 1em;
  padding-bottom: 0.5em;
`;

const RecipeHashTag = styled(Badge)`
  cursor: pointer;
  padding: 0.5em;
  font-size: 0.8em;
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
    const recipeCards = filteredRecipes.map((recipe) => {
      const isNew =
        new Date().getTime() - new Date(recipe.date).getTime() < 2592000000;
      const dateEx = isNew ? <Badge variant="danger">New</Badge> : null;
      //Build hash tags
      const hashtags = recipe.tags.map((tag, index) => (
        <CardLink key={index}>
          <RecipeHashTag
            value={tag}
            onClick={() => this.handleHashtagSearch(tag)}
            variant="secondary"
          >
            #{tag}
          </RecipeHashTag>
          &nbsp;
        </CardLink>
      ));
      return (
        <div key={recipe.id.toString()} className="col-sm-4">
          <RecipeCard className="border">
            <CardLink href={"/#/recipe/" + recipe.id}>
              <Card.Img className="border" variant="top" src={recipe.img[0]} />
              <Card.Body>
                <Card.Title>
                  {recipe.title}&nbsp;{dateEx}
                </Card.Title>
                <Card.Text>
                  <FormattedDate
                    value={recipe.date}
                    year="numeric"
                    month="long"
                    day="numeric"
                  />
                </Card.Text>
              </Card.Body>
            </CardLink>
            <RecipeHashTagContainer>{hashtags}</RecipeHashTagContainer>
          </RecipeCard>
        </div>
      );
    });
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
