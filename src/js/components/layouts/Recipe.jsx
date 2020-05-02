import React from "react";
import { Card, Carousel, Row } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

const RecipeCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  padding: 3em 5em 3em 5em;
  border: 1px solid #c0c0c0;
`;

const RecipePicture = styled(Card.Img)`
  border-radius: 0.7em;
`;

const RecipeTitle = styled(Card.Title)`
  font-size: 2.5em;
`;

const RecipeDate = styled(Card.Title)`
  font-size: 0.8em;
  color: #808080;
`;

export default class Recipe extends React.Component {
  constructor(props) {
    super(props);
  }

  formatDate(dt) {
    //TODO: implement formatjs
    let date = new Date(dt);
    return (
      date.getDate() +
      " " +
      date.toLocaleString(window.navigator.language, { month: "long" }) +
      " " +
      date.getFullYear()
    );
  }

  render() {
    const recipe = this.props.recipe;
    const relatedRecipes = this.props.related.map(recipe => (
      <React.Fragment key={recipe.id}>
          <Card.Text>&nbsp;•&nbsp;</Card.Text>
          <Card.Link href={"/#/recipe/" + recipe.id}>{recipe.title}</Card.Link>
      </React.Fragment>
    ));
    //Prepare pictures
    const recipePictures = this.props.recipe.img.map(img => (
      <Carousel.Item key={img}>
        <RecipePicture className="border" variant="top" src={img} />
      </Carousel.Item>
    ));
    return (
      <div className="row align-items-center">
        <RecipeCard className="col-md-6 offset-md-3">
          <RecipeDate>{this.formatDate(recipe.date)}</RecipeDate>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Carousel className="d-block" interval="5000">
            {recipePictures}
          </Carousel>
          <Card.Body>
            <Card.Text>{recipe.body}</Card.Text>
          </Card.Body>
          <hr />
          <div className="row d-flex flex-row-reverse align-items-end">
            <Row>
              <Card.Link href="/#/recipes">Recipes</Card.Link>
              {relatedRecipes}
            </Row>
          </div>
          <hr />
        </RecipeCard>
      </div>
    );
  }
}

Recipe.propTypes = {
  recipe: PropTypes.object.isRequired,
  related: PropTypes.array.isRequired
};
