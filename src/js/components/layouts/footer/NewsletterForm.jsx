import React, { useState } from "react";
import { Button, Container, Col, Form, Row, Toast } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { subscribeNewsletter } from "../../../actions/newsletterActions";

export default function NewsletterForm() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [toastVisible, showToast] = useState(false);
  const [toastTitle, setToastTitle] = useState('');
  const [toastBody, setToastBody] = useState('');

  const subscribeToNewsletter = (ev) => {
    ev.preventDefault();
    dispatch(subscribeNewsletter(email)).then(() => {
      //Show Toast success
      setToastTitle("Thank you!");
      setToastBody("You successfully subscribed to our newsletter");
      setEmail('');
      showToast(true);
    }).catch(() => {
      setToastTitle("Something went wrong");
      setToastBody("It was not possible to subscribe you to our newsletter");
      showToast(true);
    });
  };

  return (
    <Container fluid>
      <Toast show={toastVisible} onClose={() => showToast(false)}>
        <Toast.Header>
          <strong className="mr-auto">{toastTitle}</strong>
        </Toast.Header>
        <Toast.Body style={{color: "#101010"}}>
          {toastBody}
        </Toast.Body>
      </Toast>
      <Form>
        <Row>
          <Col style={{ paddingLeft: 0 }} xs={8}>
            <Form.Group controlId="newsletterForm">
              <Form.Control type="email" placeholder="Your email address" value={email} onChange={(ev) => setEmail(ev.currentTarget.value)} />
            </Form.Group>
          </Col>
          <Col style={{ paddingLeft: 0 }} xs={4}>
            <Button variant="success" type="submit" onClick={(ev) => subscribeToNewsletter(ev)}>
              Sign up
            </Button>
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

NewsletterForm.propTypes = {
  newsletterSubscription: PropTypes.bool,
};
