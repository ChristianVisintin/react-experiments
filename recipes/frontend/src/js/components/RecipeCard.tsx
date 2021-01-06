/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Card, Row } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

import Recipe from "../lib/data/recipe";

const RecipeCardDiv = styled(Card)`
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

const CardLink = styled.a`
  text-decoration: none;
  color: #303030;
  :hover {
    text-decoration: none;
    color: #303030;
  }
`;

interface OwnProps {
  recipe: Recipe;
  handleSearch: Function;
}

export default class RecipeCard extends React.Component<OwnProps, {}> {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
    handleSearch: PropTypes.func.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    // Check if new
    const isNew =
      new Date().getTime() - new Date(recipe.date).getTime() < 2592000000;
    const dateEx = isNew ? <Badge variant="danger">New</Badge> : null;
    //Build hash tags
    const hashtags = recipe.category.map((category, index) => (
      <CardLink key={index}>
        <RecipeHashTag
          value={category}
          onClick={() => this.props.handleSearch(category)}
          variant="secondary"
        >
          #{category}
        </RecipeHashTag>
        &nbsp;
      </CardLink>
    ));
    return (
      <div key={recipe.id.toString()} className="col-sm-4">
        <RecipeCardDiv className="border">
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
        </RecipeCardDiv>
      </div>
    );
  }
}
