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
import Logo from "../../../assets/images/icons/logo.svg";

const HomeTitle = styled.h1`
  font-size: 1.3em;
  color: charcoal;
`;

const HomeRef = styled.h2`
  font-size: 1.3em;
  color: #606060;
`;

const MenuBar = styled(Navbar)`
  padding-right: 2em;
`

export default function Menu() {
  return (
    <header>
      <MenuBar bg="light" expand="lg" className="menu-nav">
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
              <HomeTitle>Veeso</HomeTitle>
            </NavbarBrand>
            <Nav.Link href="#recipes">
              <HomeRef>Recipes</HomeRef>
            </Nav.Link>
            <Nav.Link href="#about">
              <HomeRef>About</HomeRef>
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-success">Search</Button>
          </Form>
        </Navbar.Collapse>
      </MenuBar>
    </header>
  );
}

//TODO: implement form search
