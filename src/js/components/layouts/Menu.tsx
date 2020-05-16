import React, { useState } from "react";
import {
  Navbar,
  NavbarBrand,
  Nav,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";
import { FormattedMessage, injectIntl, WrappedComponentProps } from 'react-intl';
import styled from "styled-components";
import PropTypes from "prop-types";

//Resources
import LogoPath from "../../../assets/images/icons/logo.svg";

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

export interface MenuProps {
  searchHnd: Function
}

function Menu(props: MenuProps & WrappedComponentProps) {

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
            src={LogoPath}
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
              <HomeRef>
                <FormattedMessage id="home.menu.recipes" />
              </HomeRef>
            </Nav.Link>
            <Nav.Link href="#about">
              <HomeRef>
                <FormattedMessage id="home.menu.about" />
              </HomeRef>
            </Nav.Link>
          </Nav>
          <Form inline>
            <FormControl type="text" placeholder={props.intl.formatMessage({id: "home.menu.search"})} className="mr-sm-2" value={searched} onChange={(ev) => setSearch(ev.target.value)} />
            <Button variant="outline-success" onClick={search}>
              <FormattedMessage id="home.menu.search" />
            </Button>
          </Form>
        </Navbar.Collapse>
      </MenuBar>
    </header>
  );
}

Menu.propTypes = {
  searchHnd: PropTypes.func.isRequired
};

export default injectIntl(Menu);
