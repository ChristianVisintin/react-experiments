import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { fetchRecipes } from "../../../actions/recipeActions";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`;

const Line = styled.span`
  font-size: 1em;
  opacity: 0.6;
`;

class Recents extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    let recentRecipes = [...this.props.recipes];
    //Sort recipes by date (by the newest)
    recentRecipes.sort((a, b) => {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      if (dateA < dateB) return 1;
      if (dateA > dateB) return -1;
      return 0;
    });
    recentRecipes = recentRecipes.splice(0, 5);
    const recipeItems = recentRecipes.map(recipe => 
      <Row key={recipe.id}>
        <Col>
        <Line>{recipe.title}</Line>
        </Col>
      </Row>
    );
    return (
      <Container>
        <Row>
          <Col>
            <Header>Recent Recipes</Header>
          </Col>
        </Row>
          {recipeItems}
      </Container>
    );
  }
}

Recents.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.items
});

export default connect(mapStateToProps, { fetchRecipes })(Recents);
