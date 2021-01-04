/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
import { Facebook } from "react-content-loader";
import styled from "styled-components";
import { FormattedMessage } from "react-intl";

//Layouts
import HomeSlideshow from "../components/HomeSlideshow";
// Lib
import Recipe from "../lib/data/recipe";
import Tweet from "../lib/data/tweet";
import { fetchTweets } from "../actions/twitterActions";
import { RootState } from "../store/index";
import TweetCard from "../components/TweetCard";
import TweetLoader from "../components/TweetLoader";
import TweetsList from "../layouts/TweetsList";

const LatestTweets = styled.h2`
  font-size: 1.5em;
  color: #606060;
`;

interface OwnProps {
  recipes: Array<Recipe>;
}

interface DispatchProps {
  fetchTweets: Function;
}

interface OwnStates {
  tweetsLoaded: Boolean;
}

interface StateProps {
  tweets: Array<Tweet>;
}

type MainPageProps = StateProps & OwnProps & DispatchProps;

class MainPage extends React.Component<MainPageProps, OwnStates> {
  constructor(props: MainPageProps) {
    super(props);
    this.state = {
      tweetsLoaded: false,
    };
  }

  componentDidMount() {
    this.props
      .fetchTweets()
      .then(() => {
        // Set state
        this.setState({ tweetsLoaded: true });
      })
      .catch(() => {
        console.error("Could not load tweets");
      });
  }

  render() {
    // Prepare tweets
    const tweets = this.state.tweetsLoaded
      ? this.props.tweets.map((tweet) => (
          <Row className="w-100" key={tweet.uuid}>
            <TweetCard tweet={tweet} />
          </Row>
        ))
      : this.createDummyContentLoader(4);
    return (
      <Container fluid className="w-100">
        <Row className="justify-content-md-center">
          <Col
            className="row d-flex flex-wrap d-inline-flex w-100"
            xs={12}
            sm={12}
            lg={8}
            md="auto"
          >
            <HomeSlideshow recipes={this.props.recipes} />
          </Col>
          <Col
            className="row d-flex flex-wrap d-inline-flex offset-md-1"
            xs={12}
            sm={12}
            lg={3}
            md="auto"
          >
            <LatestTweets>
              <FormattedMessage id="home.tweets" />
            </LatestTweets>
            <TweetsList items={tweets} />
          </Col>
        </Row>
      </Container>
    );
  }

  /**
   * @description create a list of Facebook content loaders
   * @param {number} size
   * @return {Array<typeof Facebook>}
   */

  createDummyContentLoader(size: number): Array<typeof Facebook> {
    let container = new Array();
    for (let i = 0; i < size; i++) {
      container.push(
        <Row className="w-100" key={i}>
          <TweetLoader />
        </Row>
      );
    }
    return container;
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  tweets: state.tweets.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchTweets: () => dispatch(fetchTweets()),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
