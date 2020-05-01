import React from "react";
import { Badge, Card, CardColumns, Nav } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

//Components

const CardLink = styled.a`
  text-decoration: none;
  color: #303030;
  ${CardLink}:hover {
    text-decoration: none;
    color: #303030;
  }
`

export default class Recipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {category: "all"};
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  handleCategorySelect(e) {
    this.setState({category: e});
  }

  formatDate(dt) {
    //TODO: implement formatjs
    let date = new Date(dt);
    return date.getDate() + " " + date.toLocaleString(window.navigator.language, {month: 'long'}) + " " + date.getFullYear();
  }

  render() {
    //Prepare recipes to display
    const filteredRecipes = this.props.recipes.filter((item) => {
      //If category is all, don't check, otherwise check if category is in recipe category list
      return this.state.category === "all" ? item : item.category.includes(this.state.category);
    });
    //Prepare recipe cards
    const recipeCards = filteredRecipes.map((recipe) => {
      const isNew = ((new Date().getTime()) - new Date(recipe.date).getTime()) < 2592000000;
      const dateEx = isNew ? <Badge variant="danger">New</Badge> : null;
      return(
      <Card className="border" key={recipe.id}>
        <CardLink href={"/#/recipe/" + recipe.id}>
          <Card.Img className="border" variant="top" src={recipe.img} />
          <Card.Body>
            <Card.Title>{recipe.title}&nbsp;{dateEx}</Card.Title>
            <Card.Text>
              {this.formatDate(recipe.date)}
            </Card.Text>
          </Card.Body>
        </CardLink>
      </Card>
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
        </Nav>
        <CardColumns>
          {recipeCards}
        </CardColumns>
      </React.Fragment>
    );
  }
}

Recipes.propTypes = {
  recipes: PropTypes.array.isRequired
};
