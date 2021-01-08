/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

const Cover = styled.div`
  overflow: hidden;
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
`;

interface OwnProps {
  height: string;
  width: string;
  image: string;
  //children?: React.ReactChild | React.ReactChild[];
}

type ParallaxProps = OwnProps & React.HTMLAttributes<HTMLDivElement>;

export default function Parallax(props: ParallaxProps) {
  // Build style
  const parallaxStyle = {
    backgroundImage: "url(" + props.image + ")",
    width: props.width,
    height: props.height,
  };
  return (
    <Container fluid>
      <Cover style={parallaxStyle}>
        {props.children}
      </Cover>
    </Container>
  );
}

Parallax.propTypes = {
  height: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
};
