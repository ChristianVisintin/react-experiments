import React from 'react';
import { Carousel, Container } from 'react-bootstrap';
import importFrom from '../../utils';

//Import images for slideshow
const images = importFrom(require.context('../../../assets/images/contents/', false, /\.(png|jpe?g|svg)$/));

//Layouts
import HomeSlideshow from '../HomeSlideshow';

export default function Home() {
  return (
    <Container fluid className="w-100">
      <Container fluid className="justify-content-center row d-flex w-100">
        <HomeSlideshow images={images} />
      </Container>
    </Container>
  )
}
