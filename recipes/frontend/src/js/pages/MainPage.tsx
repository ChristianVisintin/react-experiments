/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";
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
import Parallax from "../components/Parallax";
import RecipeCard from "../components/RecipeCard";

const BottomTitle = styled.h2`
  font-size: 1.5em;
  color: #606060;
`;

const Mission = styled.h4`
  text-align: center;
`;

const HomeSection = styled(Row)`
  padding-top: 1em;
  padding-bottom: 1em;
`;

const YoutubeChannelBox = styled.div`
  position: relative;
  width: 33%;
  height: fit-content;
  padding: 2em;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: white;
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
      .fetchTweets(6, 0, "date")
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
    // Prepare recipes
    const recipes = this.props.recipes.map((recipe) => (
      <RecipeCard key={recipe.id} recipe={recipe} />
    ));
    return (
      <Container fluid className="w-100">
        {/* First parallax */}
        <Row className="w-100">
          <Parallax
            width="100vw"
            height="60vh"
            image="/assets/images/gfx/overlay.jpg"
          />
        </Row>
        {/* Introduction */}
        <HomeSection className="w-100 text-center justify-content-md-center">
          <Col className="w-100 text-center justify-content-md-center">
            <Row className="w-100 text-center justify-content-md-center">
              <h1>
                <FormattedMessage id="home.introduction.title" />
              </h1>
            </Row>
            <Row className="w-100 justify-content-md-center">
              <h2>
                <FormattedMessage id="home.introduction.subtitle" />
              </h2>
            </Row>
            <Row className="w-100 text-center justify-content-md-center">
              <Col xs={12} sm={12} md="auto" lg={6}>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  gravida ut nisl euismod sagittis. Vestibulum in cursus dui. In
                  egestas ex eu vestibulum ultricies. Donec quis scelerisque
                  magna, eget malesuada orci. Sed hendrerit felis auctor
                  elementum eleifend. Vestibulum ante ipsum primis in faucibus
                  orci luctus et ultrices posuere cubilia curae; Phasellus
                  cursus rutrum maximus. Cras eget condimentum eros, quis
                  vehicula arcu. Nunc mattis imperdiet metus vitae facilisis.
                  Donec maximus leo nec tristique gravida. Phasellus in mauris
                  varius, volutpat metus finibus, euismod orci. Praesent metus
                  turpis, accumsan ut convallis a, accumsan eget ligula. Aliquam
                  pellentesque volutpat velit eget condimentum.
                </p>
              </Col>
            </Row>
            <Row className="w-100 text-center justify-content-md-center">
              <h3>
                <FormattedMessage id="home.introduction.mission" />
              </h3>
            </Row>
            <Row className="w-100 justify-content-md-center">
              <Col xs={12} sm={12} md="auto" lg={2}>
                <Mission>Lorem ipsum</Mission>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  gravida ut nisl euismod sagittis. Vestibulum in cursus dui.
                </p>
              </Col>
              <Col xs={12} sm={12} md="auto" lg={2}>
                <Mission>Maecenas</Mission>
                <p>
                  Maecenas at leo a elit laoreet imperdiet. Sed faucibus urna id
                  libero bibendum, et lobortis ligula fringilla.
                </p>
              </Col>
              <Col xs={12} sm={12} md="auto" lg={2}>
                <Mission>Luctus</Mission>
                <p>
                  Nam a felis finibus, aliquam felis nec, lobortis metus. Sed ut
                  magna sagittis
                </p>
              </Col>
            </Row>
          </Col>
        </HomeSection>
        {/* Second parallax with youtube channels */}
        <Row className="w-100">
          <Parallax
            width="100vw"
            height="60vh"
            image="/assets/images/gfx/overlay2.jpg"
          >
            <Container fluid className="h-100 text-center d-flex justify-content-md-center">
              <YoutubeChannelBox className="align-self-center">
                <h3>
                  <FormattedMessage id="home.youtube.title" />
                </h3>
                <a href="https://www.youtube.com/watch?v=Cz8NC6b6HEU">
                  <Button variant="outline-dark">
                    <FormattedMessage id="home.youtube.view" />
                  </Button>
                </a>
              </YoutubeChannelBox>
            </Container>
          </Parallax>
        </Row>
        {/* Latest recipes and tweets */}
        <HomeSection className="justify-content-md-center">
          <Col
            className="row d-flex flex-wrap d-inline-flex w-100 align-self-center"
            xs={10}
            sm={10}
            lg={8}
            md="auto"
          >
            <Row className="w-100 justify-content-md-center">
              <BottomTitle>
                <FormattedMessage id="home.discoverRecipes" />
              </BottomTitle>
            </Row>
            <Row className="w-100 justify-content-md-center">{recipes}</Row>
          </Col>
          <Col
            className="row d-flex flex-wrap d-inline-flex offset-md-1"
            xs={12}
            sm={12}
            lg={3}
            md="auto"
          >
            <BottomTitle>
              <FormattedMessage id="home.tweets" />
            </BottomTitle>
            <TweetsList items={tweets} />
          </Col>
        </HomeSection>
      </Container>
    );
  }

  /**
   * @description create a list of Facebook content loaders
   * @param {number} size
   * @return {Array<typeof TweetLoader>}
   */

  createDummyContentLoader(size: number): Array<typeof TweetLoader> {
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
  fetchTweets: (
    limit: number | undefined = undefined,
    offset: number | undefined = undefined,
    orderBy: string | undefined = undefined
  ) => dispatch(fetchTweets(limit, offset, orderBy)),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(MainPage);
