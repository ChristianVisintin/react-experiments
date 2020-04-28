import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import styled from "styled-components";

//Components
import Contact from "./footer/Contact";
import RecentProjects from "./footer/RecentProjects";
import Newsletter from "./footer/Newsletter";

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

export default function Footer() {
  return (
    <footer>
      <FooterContainer fluid>
        <Container fluid>
          {/* Row 1 is made up of 3 columns */}
          <Row>
            {/* Contacts, Recent projects, Newsletter and social */}
            <Col className="d-none d-md-block" xs={4}>
              <Contact />
            </Col>
            <Col className="d-none d-md-block" xs={4}>
              <RecentProjects />
            </Col>
            <Col md={4} xs={12}>
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
