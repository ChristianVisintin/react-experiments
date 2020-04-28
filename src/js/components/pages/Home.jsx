import React from 'react';
import { Carousel, Container } from 'react-bootstrap';

//Layouts
import HomeSlideshow from '../HomeSlideshow';

export default function Home() {
  return (
    <Container fluid className="w-100">
      <Container fluid className="justify-content-center row d-flex w-100">
        <HomeSlideshow />
      </Container>
    </Container>
  )
}
