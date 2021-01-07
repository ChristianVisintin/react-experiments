/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Dropdown } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import OrderByChoice from "../lib/misc/orderbychoice";

interface OwnProps {
  choices: Array<OrderByChoice>;
  choice: string;
  name: string;
  onSelect: Function;
}

interface OwnStates {}

export default class OrderByDropdown extends React.Component<
  OwnProps,
  OwnStates
> {
  static propTypes = {
    choices: PropTypes.array.isRequired,
    choice: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    onSelect: PropTypes.func.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = {};
  }

  render() {
    const dropdownItems = this.props.choices.map((choice) => (
      <Dropdown.Item
        active={choice.name === this.props.choice}
        key={choice.name}
        eventKey={choice.name}
      >
        <FormattedMessage id={choice.translation} />
      </Dropdown.Item>
    ));
    return (
      <Dropdown onSelect={(ev: any) => this.props.onSelect(ev)}>
        <Dropdown.Toggle variant="light" id="dropdown-basic">
          <FormattedMessage id={this.props.name} />
        </Dropdown.Toggle>
        <Dropdown.Menu>{dropdownItems}</Dropdown.Menu>
      </Dropdown>
    );
  }
}
