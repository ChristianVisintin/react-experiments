import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";

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

export default function Menu(props) {

  const [searched, setSearch] = useState('');

  const search = () => {
    //Save subject
    const subject = searched;
    if (subject.length === 0) {
      return;
    }
    //Set searched to empty
    //Call Home search hnd
    props.searchHnd(subject);
    setSearch('');
  }

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
            <FormControl type="text" placeholder="Search" className="mr-sm-2" value={searched} onChange={(ev) => setSearch(ev.target.value)} />
            <Button variant="outline-success" onClick={search}>Search</Button>
          </Form>
        </Navbar.Collapse>
      </MenuBar>
    </header>
  );
}

Menu.propTypes = {
  searchHnd: PropTypes.func.isRequired
};
