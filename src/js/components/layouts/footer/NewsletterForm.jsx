import React from "react";
import {
  Button,
  Container,
  Col,
  Form,
  FormControl,
  Row,
} from "react-bootstrap";

export default function NewsletterForm() {
  return (
    <Container fluid>
      <Form>
        <Row>
          <Col style={{paddingLeft: 0}} xs={8}>
            <Form.Group controlId="newsletterForm">
              <Form.Control type="email" placeholder="Your email address" />
            </Form.Group>
          </Col>
          <Col style={{paddingLeft: 0}} xs={4}>
            <Button variant="success" type="submit">
              Sign up
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}
