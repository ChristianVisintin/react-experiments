import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FormattedMessage } from 'react-intl';
import styled from "styled-components";
import PropTypes from "prop-types";

import Recipe from "../../classes/recipe";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`;

const Line = styled.span`
  font-size: 1em;
  opacity: 0.6;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: white;
  }
`;

export interface RecentsProps {
  recipes: Array<Recipe>
};

export default class Recents extends React.Component<RecentsProps, {}> {

  static propTypes = {
    recipes: PropTypes.array.isRequired,
  };  

  constructor(props: RecentsProps) {
    super(props);
  }

  render() {
    let recentRecipes = [...this.props.recipes];
    //Get first 5 recipes
    recentRecipes = recentRecipes.splice(0, 5);
    const recipeItems = recentRecipes.map(recipe => 
      <Row key={recipe.id}>
        <Col>
        <a href={"/#/recipe/" + recipe.id}><Line>{recipe.title}</Line></a>
        </Col>
      </Row>
    );
    return (
      <Container>
        <Row>
          <Col>
            <Header>
              <FormattedMessage id="home.footer.recents.title" />
            </Header>
          </Col>
        </Row>
          {recipeItems}
      </Container>
    );
  }
}
