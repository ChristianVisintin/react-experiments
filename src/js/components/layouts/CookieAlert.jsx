import React from 'react';
import { Button, Form, Navbar } from 'react-bootstrap';
import styled from "styled-components";
import { FormattedMessage } from 'react-intl';
import PropTypes from "prop-types";

import { connect } from 'react-redux';
import { acceptCookiePolicy } from '../../actions/cookiesActions';

const MenuBar = styled(Navbar)`
  color: white;
`

const MenuText = styled(Navbar.Text)`
  color: white !important;
`

const MenuButton = styled(Button)`
  margin: 0.5em;
`

function CookieAlert(props) {
  const showMoreInfo = (ev) => {
    ev.preventDefault();
    props.showCookiePolicy();
  };
  const acceptCookiePolicy = (ev) => {
    ev.preventDefault();
    props.acceptCookiePolicy();
    //Go back to home
    window.location = "/";
  };
  return (
    <MenuBar bg="dark" expand="lg" className="menu-nav justify-content-between" fixed="bottom">
      <MenuText>
        <FormattedMessage id="cookies.alert.text" />
      </MenuText>
      <Form inline>
        <MenuButton variant="secondary" onClick={showMoreInfo}>
          <FormattedMessage id="cookies.alert.info" />
        </MenuButton>
        <MenuButton variant="info" onClick={acceptCookiePolicy}>
          <FormattedMessage id="cookies.alert.accept" />
        </MenuButton>
      </Form>
    </MenuBar>
  )
}

CookieAlert.propTypes = {
  showCookiePolicy: PropTypes.func.isRequired,
  acceptCookiePolicy: PropTypes.func.isRequired
};

export default connect(null, { acceptCookiePolicy })(CookieAlert);
