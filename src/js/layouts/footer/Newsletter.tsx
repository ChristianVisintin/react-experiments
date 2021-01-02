/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Col, Image, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faLinkedin,
  faFacebook,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";
import styled from "styled-components";

import NewsletterForm from "./NewsletterForm";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`;

const SocialIcon = styled.a`
  font-size: 2em;
  margin-right: 2em;
  color: #ffffff;
  opacity: 0.6;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: #ffffff;
    opacity: 1;
  }
`;

export default function Newsletter() {
  return (
    <Container>
      <Row>
        <Col className="d-none d-md-block">
          <Header>Newsletter</Header>
        </Col>
      </Row>
      <Row>
        <Col className="d-none d-md-block">
          <NewsletterForm />
        </Col>
      </Row>
      <Row>
        <Col>
          <SocialIcon href="https://github.com/ChristianVisintin/react-experiments">
            <FontAwesomeIcon icon={faFacebook} />
          </SocialIcon>
          <SocialIcon href="https://github.com/ChristianVisintin/react-experiments">
            <FontAwesomeIcon icon={faInstagram} />
          </SocialIcon>
          <SocialIcon href="https://www.linkedin.com/in/christian-visintin/">
            <FontAwesomeIcon icon={faLinkedin} />
          </SocialIcon>
          <SocialIcon href="https://github.com/ChristianVisintin">
            <FontAwesomeIcon icon={faGithub} />
          </SocialIcon>
        </Col>
      </Row>
    </Container>
  );
}
