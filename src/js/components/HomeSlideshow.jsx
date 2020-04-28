import React from "react";
import { Carousel, Image } from "react-bootstrap";
import styled from "styled-components";
import { connect } from "react-redux";
import PropTypes from "prop-types";

//Actions
import { fetchRecipes } from "../actions/recipeActions";

class HomeSlideshow extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.props.fetchRecipes();
  }

  render() {
    //Get first 3 (or less) random recipes
    let recipes = [];
    let sortedIndex = [];
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
          <Image className="d-block w-100" src={recipe.img} />
          <Carousel.Caption>
            <h1 style={{textShadow: "0px 0 black, 0 0.3px black, 1px 0 black, 0 0 black"}}>
              {recipe.title}
            </h1>
          </Carousel.Caption>
        </a>
      </Carousel.Item>
    ));

    return (
      <Carousel className="border-right border-left border-top d-block w-50" interval="5000">
        {slideshow}
      </Carousel>
    );
  }
}

HomeSlideshow.propTypes = {
  fetchRecipes: PropTypes.func.isRequired,
  recipes: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  recipes: state.recipes.items,
});

export default connect(mapStateToProps, { fetchRecipes })(HomeSlideshow);
