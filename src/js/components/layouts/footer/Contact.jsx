import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`;

const Line = styled.span`
  font-size: 1em;
  opacity: 0.6;
`;

export default function Contact() {
  return (
    <Container>
      <Row>
        <Col>
          <Header>Contact</Header>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Christian Visintin</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>33, ********* Street</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Udine, Italy</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Zip Code: 33100</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Email: christian.visintin@gmail.com</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Mobile: +39 366 167 ****</Line>
        </Col>
      </Row>
    </Container>
  );
}
