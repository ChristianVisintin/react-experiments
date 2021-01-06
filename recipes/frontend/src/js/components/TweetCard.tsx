/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Card, Image } from "react-bootstrap";
import { FormattedDate } from "react-intl";
import PropTypes from "prop-types";
import styled from "styled-components";

import Tweet from "../lib/data/tweet";

// Components
const TweetCardDiv = styled(Card)`
  padding: 2px;
  border: 1px solid #c0c0c0;
  margin-bottom: 2em;
  min-width: 100%;
  max-width: 100%;
`;

const TweetContainer = styled.div`
  padding: 1em;
`;

const TweetHeader = styled(Card.Header)`
  font-size: 1.1em;
  color: #606060;
`;

const TweetAuthor = styled(Card.Title)`
  font-size: 1em;
  color: #606060;
  display: inline-block;
  margin-right: 2ch;
`;

const TweetUsername = styled.a`
  font-size: 0.7em;
  color: #808080;
  display: inline-block;
`;

const TweetDate = styled(Card.Title)`
  font-size: 0.8em;
  color: #808080;
`;

const TweetBody = styled(Card.Text)`
  font-size: 1em;
  color: #404040;
`;

const TweetPicture = styled(Image)`
  height: 2em;
  width: auto;
  display: inline-block;
  margin-right: 2ch;
`;

interface OwnProps {
  tweet: Tweet;
}

export default class TweetCard extends React.Component<OwnProps, {}> {
  static propTypes = {
    tweet: PropTypes.object.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
  }

  render() {
    const userUri = "https://twitter.com/" + this.props.tweet.username;
    return (
      <TweetCardDiv>
        <TweetHeader>
          <TweetPicture src={this.props.tweet.avatar} roundedCircle />
          <TweetAuthor>
            {this.props.tweet.nickname}
          </TweetAuthor>
          <TweetUsername href={userUri}>
            @{this.props.tweet.username}
          </TweetUsername>
        </TweetHeader>
        <TweetContainer>
          <TweetDate>
            <FormattedDate
              value={this.props.tweet.date}
              year="numeric"
              month="long"
              day="numeric"
            />
          </TweetDate>
          <TweetBody>{this.props.tweet.text}</TweetBody>
        </TweetContainer>
      </TweetCardDiv>
    );
  }
}
