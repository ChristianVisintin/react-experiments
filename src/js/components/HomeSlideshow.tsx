import React from "react";
import { Carousel, Image } from "react-bootstrap";
import PropTypes from "prop-types";

import Recipe from "../classes/recipe";

interface HomeSlideshowProps {
  recipes: Array<Recipe>
};

export default class HomeSlideshow extends React.Component<HomeSlideshowProps, {}> {

  static propTypes = {
    recipes: PropTypes.array.isRequired,
  };

  constructor(props: HomeSlideshowProps) {
    super(props);
  }

  render() {
    //Get first 3 (or less) random recipes
    let recipes = [];
    let sortedIndex:  Array<number> = [];
    for (let i = 0; i < 3 && i < this.props.recipes.length; i++) {
      let randomIndex = Math.floor(Math.random() * this.props.recipes.length);
      //Index can't get sorted twice
      if (sortedIndex.includes(randomIndex)) {
        i--;
        continue;
      }
      sortedIndex.push(randomIndex);
      recipes.push(this.props.recipes[randomIndex]);
    }
    const slideshow = recipes.map((recipe) => (
      <Carousel.Item key={recipe.id}>
        <a href={"/#/recipe/" + recipe.id}>
          <Image className="d-block w-100" src={recipe.img[0]} />
          <Carousel.Caption>
            <h1 style={{textShadow: "0px 0 black, 0 0.3px black, 1px 0 black, 0 0 black"}}>
              {recipe.title}
            </h1>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    ));

    return (
      <Carousel className="border-right border-left border-top d-block w-50" interval={5000}>
        {slideshow}
      </Carousel>
    );
  }
}
