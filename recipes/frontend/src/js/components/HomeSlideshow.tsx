/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Carousel, Image } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

import Recipe from "../lib/data/recipe";

const ItemTitle = styled.h1`
  font-size: 1.5em;
  text-transform: uppercase;
  text-shadow: 0px 0 black, 0 1px black, 1px 0 black, 0 0 black;
`;

interface HomeSlideshowProps {
  recipes: Array<Recipe>;
}

export default class HomeSlideshow extends React.Component<
  HomeSlideshowProps,
  {}
> {
  static propTypes = {
    recipes: PropTypes.array.isRequired,
  };

  constructor(props: HomeSlideshowProps) {
    super(props);
  }

  render() {
    const slideshow = this.props.recipes.map((recipe) => (
      <Carousel.Item key={recipe.id}>
        <a href={"/#/recipe/" + recipe.id}>
          <Image className="d-block w-100" src={recipe.img[0]} />
          <Carousel.Caption>
            <ItemTitle>
              {recipe.title}
            </ItemTitle>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    ));

    return (
      <Carousel
        className="border-right border-left border-top d-block w-100"
        interval={5000}
      >
        {slideshow}
      </Carousel>
    );
  }
}
