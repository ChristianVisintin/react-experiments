/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Button } from "react-bootstrap";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRedo } from "@fortawesome/free-solid-svg-icons";

const GoTopIcon = styled(Button)`
  background-color: transparent;
  border-color: transparent;
  padding: 0;
  font-size: 2em;
  color: #808080;
  text-align: center;
  transition: transform 0.4s ease-in-out;
  :hover, :active {
    border-color: transparent;
    background-color: transparent;
    color: #404040;
  }
  :hover {
    transform: rotate(180deg);
  }
`;

export default function GoTopArrow() {
  return (
    <Container fluid className="justify-content-center w-100">
      <GoTopIcon onClick={() => window.scrollTo(0, 0)}>
        <FontAwesomeIcon icon={faRedo} />
      </GoTopIcon>
    </Container>
  );
}
