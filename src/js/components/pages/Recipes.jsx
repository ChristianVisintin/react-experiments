import React from "react";
import { Card, CardColumns, Col, Container, Nav, Row } from "react-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { fetchRecipes } from "../../actions/recipeActions";

//Components

const CardLink = styled.a`
  text-decoration: none;
  color: #303030;
  ${CardLink}:hover {
    text-decoration: none;
    color: #303030;
  }
`

class Recipes extends React.Component {

  constructor(props) {
    super(props);
    this.state = {category: "all"};
    this.handleCategorySelect = this.handleCategorySelect.bind(this);
  }

  componentDidMount() {
    this.props.fetchRecipes();
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
    const recipeCards = filteredRecipes.map((recipe) => (
      <Card className="border" key={recipe.id}>
        <CardLink href={"/#/recipe/" + recipe.id}>
          <Card.Img className="border" variant="top" src={recipe.img} />
          <Card.Body>
            <Card.Title>{recipe.title}</Card.Title>
            <Card.Text>
              {this.formatDate(recipe.date)}
            </Card.Text>
          </Card.Body>
        </CardLink>
      </Card>
    ));
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
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.items,
});

export default connect(mapStateToProps, { fetchRecipes })(Recipes);
