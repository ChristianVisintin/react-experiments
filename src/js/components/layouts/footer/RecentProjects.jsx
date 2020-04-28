import React from 'react'
import { Container, Col, Row } from 'react-bootstrap';
import styled from "styled-components";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`

const Line = styled.span`
  font-size: 1em;
  opacity: 0.6;
`

export default function RecentProjects() {
  return (
    <Container>
      <Row>
        <Col><Header>Recent Projects</Header></Col>
      </Row>
    </Container>
  )
}

//TODO: requires redux and projects
