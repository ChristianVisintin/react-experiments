/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";

//Components
import Contact from "./footer/Contact";
import Recents from "./footer/Recents";
import Newsletter from "./footer/Newsletter";

import Recipe from "../lib/data/recipe";
import { Category } from "../lib/data/category";

const FooterContainer = styled(Container)`
  background-color: #20242a;
  color: white;
  padding: 2em;
`;

const FooterCopyright = styled(Col)`
  text-align: center;
`;
const FooterCopyrightHeader = styled.h1`
  font-size: 1.1em;
  font-weight: bold;
`;

const FooterCopyrightText = styled.h2`
  font-size: 0.9em;
  opacity: 0.6;
`;

export interface FooterProps {
  lang: string;
  categories: Array<Category>;
}

export default function Footer(props: FooterProps) {
  return (
    <footer>
      <FooterContainer fluid>
        <Container fluid>
          {/* Row 1 is made up of 3 columns */}
          <Row>
            {/* Contacts, Recent projects, Newsletter and social */}
            <Col lg={3} xs={12}>
              <Contact />
            </Col>
            <Col lg={4} xs={12}>
              <Recents lang={props.lang} categories={props.categories} />
            </Col>
            <Col lg={5} md={4} xs={12}>
              <Newsletter />
            </Col>
          </Row>
          {/* Row 2 has only the copyright */}
          <Row>
            <FooterCopyright>
              <FooterCopyrightHeader>Developed by</FooterCopyrightHeader>
              <FooterCopyrightText>
                © 2020 ~ Christian Visintin ~ Built using React
              </FooterCopyrightText>
            </FooterCopyright>
          </Row>
        </Container>
      </FooterContainer>
    </footer>
  );
}
