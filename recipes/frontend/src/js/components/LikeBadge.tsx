/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Button } from "react-bootstrap";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-regular-svg-icons";

const Heart = styled(FontAwesomeIcon)`
  margin-left: 1ch;
  color: #e84a43;
`;

const LikeButton = styled(Button)`
  background-position: center;
  transition: background 0.8s;
  :hover {
    background: #e84a43 radial-gradient(circle, transparent 1%, #e84a43 1%)
      center/15000%;
    svg,
    span {
      color: white;
    }
  }
  :active {
    background-color: #e84a43;
    background-size: 100%;
    transition: background 0s;
  }
`;

interface OwnProps {
  likes: number;
  onLike: Function | null;
}

interface OwnStates {}

export default class LikeBadge extends React.Component<OwnProps, OwnStates> {
  static propTypes = {
    likes: PropTypes.number.isRequired,
    onLike: PropTypes.func.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <LikeButton
        variant="light"
        disabled={this.props.onLike === null}
        onClick={() => (this.props.onLike ? this.props.onLike() : null)}
      >
        <span>{this.props.likes}</span>
        <Heart icon={faHeart} />
      </LikeButton>
    );
  }
}
