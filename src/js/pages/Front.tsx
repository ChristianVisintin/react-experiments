/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from 'react';
import { Container } from 'react-bootstrap';

//Layouts
import HomeSlideshow from '../components/HomeSlideshow';

import Recipe from "../lib/data/recipe";

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
