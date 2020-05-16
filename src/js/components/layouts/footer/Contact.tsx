import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FormattedMessage } from 'react-intl';
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
          <Header>
            <FormattedMessage id="home.footer.contact.contact" />
          </Header>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Christian Visintin</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>
            <FormattedMessage id="home.footer.contact.address" />
          </Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>
            <FormattedMessage id="home.footer.contact.city" />
          </Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>
            <FormattedMessage id="home.footer.contact.zip" />
          </Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>Email: christian.visintin@gmail.com</Line>
        </Col>
      </Row>
      <Row>
        <Col>
          <Line>
            <FormattedMessage id="home.footer.contact.mobile" />
          </Line>
        </Col>
      </Row>
    </Container>
  );
}
