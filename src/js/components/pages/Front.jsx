import React from 'react';
import { Container } from 'react-bootstrap';

//Layouts
import HomeSlideshow from '../HomeSlideshow';

export default function Front(props) {
  return (
    <Container fluid className="w-100">
      <Container fluid className="justify-content-center row d-flex w-100">
        <HomeSlideshow recipes={props.recipes} />
      </Container>
    </Container>
  )
}
