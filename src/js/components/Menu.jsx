import React from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import styled from "styled-components";

//Resources
import Logo from "../../assets/images/logo.svg";

const HomeTitle = styled.h1`
  font-size: 1.3em;
  color: charcoal;
`;

const HomeRef = styled.h2`
  font-size: 1.3em;
  color: #606060;
`;

export default function Menu() {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      <NavbarBrand href="#home">
        <img
          src={Logo}
          width="32"
          height="32"
          className="d-inline-block align-top"
          alt="Veeso logo"
        />
      </NavbarBrand>{" "}
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <NavbarBrand href="#home">
            <HomeTitle>Veeso.it</HomeTitle>
          </NavbarBrand>
          <Nav.Link href="#projects">
            <HomeRef>Projects</HomeRef>
          </Nav.Link>
          <Nav.Link href="#about">
            <HomeRef>About</HomeRef>
          </Nav.Link>
        </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-secondary">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
}

//TODO: implement form search
