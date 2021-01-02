/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Card, Carousel, Row } from "react-bootstrap";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";

//Classes
import Recipe from "../lib/data/recipe";

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

const RecipeSection = styled(Card.Title)`
  font-size: 1.8em;
  color: #404040;
`;

const RecipeDate = styled(Card.Title)`
  font-size: 0.8em;
  color: #808080;
`;

const IngredientList = styled.ul`
  list-style-type:circle;
`;

const IngredientName = styled.h4`
  font-size: 1.2em;
  color: #404040;
  display: inline-block;
  margin-right: 1ch;
`;

const IngredientQuantity = styled.h5`
  font-size: 0.9em;
  color: #606060;
  display: inline-block;
`;

export interface RecipeViewProps {
  recipe: Recipe;
  related: Array<Recipe>;
}

export default class RecipeView extends React.Component<RecipeViewProps, {}> {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    related: PropTypes.array.isRequired,
  };

  constructor(props: RecipeViewProps) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    const relatedRecipes = this.props.related.map((recipe) => (
      <React.Fragment key={recipe.id}>
        <Card.Text>&nbsp;•&nbsp;</Card.Text>
        <Card.Link href={"/#/recipe/" + recipe.id}>{recipe.title}</Card.Link>
      </React.Fragment>
    ));
    //Prepare pictures
    const recipePictures = this.props.recipe.img.map((img) => (
      <Carousel.Item key={img}>
        <RecipePicture className="border" variant="top" src={img} />
      </Carousel.Item>
    ));
    //Prepare hashtags
    const hashtags = this.props.recipe.tags.map((tag, index) => (
      <React.Fragment key={index}>
        <Badge variant="secondary">#{tag}</Badge>
        &nbsp;
      </React.Fragment>
    ));
    // Prepare ingredients
    const ingredients = this.props.recipe.ingredients.map(
      (ingredient, index) => {
        const translationKey = "recipes.ingredients." + ingredient.name;
        return (
          <li>
            <IngredientName>
              <FormattedMessage id={translationKey} />
            </IngredientName>
            <IngredientQuantity>
              {ingredient.quantity}&nbsp;{ingredient.measure}
            </IngredientQuantity>
          </li>
        );
      }
    );
    return (
      <div className="row align-items-center">
        <RecipeCard className="col-md-6 offset-md-3">
          <RecipeDate>
            <FormattedDate
              value={recipe.date}
              year="numeric"
              month="long"
              day="numeric"
            />
          </RecipeDate>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Card.Text>{hashtags}</Card.Text>
          <Carousel className="d-block" interval={5000}>
            {recipePictures}
          </Carousel>
          <Card.Body>
            <RecipeSection>
              <FormattedMessage id="recipes.ingredientsKey" />
            </RecipeSection>
            <IngredientList>{ingredients}</IngredientList>
            <RecipeSection>
              <FormattedMessage id="recipes.preparation" />
            </RecipeSection>
            <Card.Text>{recipe.body}</Card.Text>
          </Card.Body>
          <hr />
          <div className="row d-flex flex-row-reverse align-items-end">
            <Row>
              <Card.Link href="/#/recipes">
                <FormattedMessage id="recipes.recipes" />
              </Card.Link>
              {relatedRecipes}
            </Row>
          </div>
          <hr />
        </RecipeCard>
      </div>
    );
  }
}
