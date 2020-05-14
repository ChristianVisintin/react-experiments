import React from 'react';
import { Container } from 'react-bootstrap';

//Layouts
import HomeSlideshow from '../HomeSlideshow';

import Recipe from "../../classes/recipe";

interface FrontProps {
  recipes: Array<Recipe>
};

export default function Front(props: FrontProps) {
  return (
    <Container fluid className="w-100">
      <Container fluid className="justify-content-center row d-flex w-100">
        <HomeSlideshow recipes={props.recipes} />
      </Container>
    </Container>
  )
}
