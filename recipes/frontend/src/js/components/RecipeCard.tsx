/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Card, Row, Col } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedDate } from "react-intl";

import Recipe from "../lib/data/recipe";
import LikeBadge from "./LikeBadge";

const RecipeCardDiv = styled(Card)`
  margin-top: 2em;
`;

const RecipeTitle = styled(Card.Title)`
  text-transform: capitalize;
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
}

export default class RecipeCard extends React.Component<OwnProps, {}> {
  static propTypes = {
    recipe: PropTypes.object.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
  }

  render() {
    const recipe = this.props.recipe;
    // Check if new
    const isNew =
      new Date().getTime() - new Date(recipe.date).getTime() < 604800000; // 7 days
    const dateEx = isNew ? <Badge variant="danger">New</Badge> : null;
    //Build hash tags
    const hashtags = recipe.categories.map((category, index) => (
      <CardLink key={index}>
        <RecipeHashTag value={category} variant="secondary">
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
              <RecipeTitle>
                {recipe.title}&nbsp;{dateEx}
              </RecipeTitle>
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
          <Row>
            <Col md="8">
              <RecipeHashTagContainer>{hashtags}</RecipeHashTagContainer>
            </Col>
            <Col className="d-flex flex-row-reverse" md="4">
              <LikeBadge likes={recipe.likes ? recipe.likes : 0} />
            </Col>
          </Row>
        </RecipeCardDiv>
      </div>
    );
  }
}
