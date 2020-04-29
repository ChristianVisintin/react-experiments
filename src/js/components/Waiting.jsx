import React from 'react';
import { Container, Spinner } from 'react-bootstrap';
import styled from "styled-components";

const SpinnerContainer = styled.div`
  text-align: center;
  padding: 3em;
`

const BigSpinner = styled(Spinner)`
  width: 5rem;
  height: 5rem;
`

export default function Waiting() {
  return (
    <Container className="justify-content-center w-100">
      <SpinnerContainer className="justify-content-center w-100">
        <BigSpinner className="justify-content-center" animation="border" variant="success" />
      </SpinnerContainer>
    </Container>
  )
}
