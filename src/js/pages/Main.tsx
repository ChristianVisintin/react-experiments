/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

//Layouts
import HomeSlideshow from '../components/HomeSlideshow';

import Recipe from "../lib/data/recipe";

interface MainProps {
  recipes: Array<Recipe>
};

export default function Main(props: MainProps) {
  return (
    <Container fluid className="w-100">
      <Row className="justify-content-md-center">
        <Col className="justify-content-center row d-flex flex-wrap d-inline-flex align-self-center align-items-center" xs={12} sm="auto" lg={12} md="auto">
          <HomeSlideshow recipes={props.recipes} />
        </Col>
      </Row>
    </Container>
  )
}
