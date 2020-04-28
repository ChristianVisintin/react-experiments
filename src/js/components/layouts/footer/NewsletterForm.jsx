import React from "react";
import {
  Button,
  Container,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";
import styled from "styled-components";

const SubscribeButton = styled(Button)`
  background-color: #B73239;
  border-color: #A73239;
`

export default function NewsletterForm() {
  return (
    <Container fluid>
      <Form>
        <Row>
          <Col xs={8}>
            <Form.Group controlId="newsletterForm">
              <Form.Control type="email" placeholder="Your email address" />
            </Form.Group>
          </Col>
          <Col xs={4}>
            <SubscribeButton variant="danger" type="submit">
              Sign up
            </SubscribeButton>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
