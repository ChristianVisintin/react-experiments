import React from "react";
import { Badge, Card, Nav, Row } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

//Components

const CardLink = styled.a`
  text-decoration: none;
  color: #303030;
  ${CardLink}:hover {
    text-decoration: none;
    color: #303030;
  }
`

const CardContainer = styled.div`
  padding-left: 1em;
  padding-right: 1em;
`

const RecipeCard = styled(Card)`
  margin-top: 2em;
`

const RecipeHashTagContainer = styled(Row)`
  margin-left: 1em;
  padding-bottom: 0.5em;
`

const RecipeHashTag = styled(Badge)`
  cursor: pointer;
  padding: 0.5em;
  font-size: 0.8em;
`

export default class Recipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {category: "all"};
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
    this.handleHashtagSearch = this.handleHashtagSearch.bind(this);
  }

  handleCategorySelect(e) {
    this.setState({category: e});
  }

  handleHashtagSearch(hashtag) {
    this.props.searchHnd(hashtag);
  }

  render() {
    //Prepare recipes to display
    let filteredRecipes = this.props.recipes.filter((item) => {
      //If category is all, don't check, otherwise check if category is in recipe category list
      return this.state.category === "all" ? item : item.category.includes(this.state.category);
    });
    //If search is NOT null, search for a recipe
    if (this.props.search) {
      const searched = this.props.search.startsWith('#') ? this.props.search.substring(1) : this.props.search;
      filteredRecipes = filteredRecipes.filter((item) => {
        //Check if search is contained in name or in tags
        const name = item.title.toLowerCase();
        const inHashTags = item.tags.includes(searched);
        return name.includes(searched) || inHashTags;
      });
    }
    //Prepare recipe cards
    const recipeCards = filteredRecipes.map((recipe) => {
      const isNew = ((new Date().getTime()) - new Date(recipe.date).getTime()) < 2592000000;
      const dateEx = isNew ? <Badge variant="danger">New</Badge> : null;
      //Build hash tags
      const hashtags = recipe.tags.map((tag, index) => (
        <CardLink key={index}>
          <RecipeHashTag value={tag} onClick={() => this.handleHashtagSearch(tag)} variant="secondary">#{tag}</RecipeHashTag>
          &nbsp;
        </CardLink>
      ));
      return(
      <div key={recipe.id} className="col-sm-4">
        <RecipeCard className="border">
          <CardLink href={"/#/recipe/" + recipe.id}>
            <Card.Img className="border" variant="top" src={recipe.img[0]} />
            <Card.Body>
              <Card.Title>{recipe.title}&nbsp;{dateEx}</Card.Title>
              <Card.Text>
                <FormattedDate value={recipe.date} year="numeric" month="long" day="numeric" />
              </Card.Text>
            </Card.Body>
          </CardLink>
          <RecipeHashTagContainer>
            {hashtags}
          </RecipeHashTagContainer>
        </RecipeCard>
      </div>
    )});
    return (
      <React.Fragment>
        <Nav className="justify-content-center" activeKey="all" onSelect={this.handleCategorySelect}>
          <Nav.Item>
            <Nav.Link eventKey="all">All</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="breakfast">Breakfast</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="lunch">Lunch</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dinner">Dinner</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link eventKey="dessert">Desserts</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link hidden={this.props.search === null} onClick={this.props.resetSearch}>
              <Badge variant="secondary">
                {this.props.search}&nbsp;
                <Badge variant="light">X</Badge>
              </Badge>
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <CardContainer className="row">
          {recipeCards}
        </CardContainer>
      </React.Fragment>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired,
  resetSearch: PropTypes.func.isRequired,
  searchHnd: PropTypes.func.isRequired,
  search: PropTypes.string
};
