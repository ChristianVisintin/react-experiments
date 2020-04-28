import React from "react";
import { Carousel, Image } from "react-bootstrap";
import styled from "styled-components";

export default function HomeSlideshow(props) {

  const slideshow = props.images.map((image, index) => 
    <Carousel.Item key={index}>
      <Image className="d-block w-100" src={image.default} />
      <Carousel.Caption>
        <h1 style={{textShadow: "0px 0 black, 0 0.3px black, 1px 0 black, 0 0 black"}}>Lorem ipsum dolor sit amet</h1>
      </Carousel.Caption>
    </Carousel.Item>
  );

  return (
    <Carousel className="border-right border-left border-top d-block w-50" interval="5000">
      {slideshow}
    </Carousel>
  );
}
