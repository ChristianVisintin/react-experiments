/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container } from "react-bootstrap";
import PropTypes from "prop-types";
import styled from "styled-components";

// Components
const List = styled(Container)`
  margin-top: 1em;
  max-height: 80vh;
  overflow-y: auto;
`;

interface OwnProps {
  items: Array<any>;
}

export default class TweetsList extends React.Component<OwnProps, {}> {
  static propTypes = {
    items: PropTypes.array.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
  }

  render() {
    const items = this.props.items.map((i, index) => (
      <React.Fragment key={index}>{i}</React.Fragment>
    ));
    return <List>{items}</List>;
  }
}
