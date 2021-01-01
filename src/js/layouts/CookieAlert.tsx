/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Button, Form, Navbar } from "react-bootstrap";
import styled from "styled-components";
import {
  FormattedMessage,
  injectIntl,
  WrappedComponentProps,
} from "react-intl";
import PropTypes from "prop-types";

import { connect } from "react-redux";
import { acceptCookiePolicy } from "../actions/cookiesActions";

const MenuBar = styled(Navbar)`
  color: white;
`;

const MenuText = styled(Navbar.Text)`
  color: white !important;
`;

const MenuButton = styled(Button)`
  margin: 0.5em;
`;

export interface CookieAlertProps {
  showCookiePolicy: Function;
  acceptCookiePolicy: Function;
}

function CookieAlert(props: CookieAlertProps & WrappedComponentProps) {
  const showMoreInfo = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    props.showCookiePolicy();
  };
  const submitCookiePolicy = (ev: { preventDefault: () => void }) => {
    ev.preventDefault();
    props.acceptCookiePolicy();
    //Go back to home
    window.location.href = "/";
  };
  return (
    <MenuBar
      bg="dark"
      expand="lg"
      className="menu-nav justify-content-between"
      fixed="bottom"
    >
      <MenuText>
        <FormattedMessage id="cookies.alert.text" />
      </MenuText>
      <Form inline>
        <MenuButton variant="secondary" onClick={showMoreInfo}>
          <FormattedMessage id="cookies.alert.info" />
        </MenuButton>
        <MenuButton variant="info" onClick={submitCookiePolicy}>
          <FormattedMessage id="cookies.alert.accept" />
        </MenuButton>
      </Form>
    </MenuBar>
  );
}

CookieAlert.propTypes = {
  showCookiePolicy: PropTypes.func.isRequired,
  acceptCookiePolicy: PropTypes.func.isRequired,
};

export default connect(null, { acceptCookiePolicy })(injectIntl(CookieAlert));
