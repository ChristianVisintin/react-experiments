/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

import Recipe from "../../lib/data/recipe";
import { Category } from "../../lib/data/category";
import { RootState } from "../../store/index";
import { fetchRecipes } from "../../actions/recipeActions";

const Header = styled.h1`
  font-size: 1.2em;
  text-transform: uppercase;
`;

const Line = styled.span`
  font-size: 1em;
  opacity: 0.6;
  color: white;
  text-decoration: none;
  :hover {
    text-decoration: none;
    color: white;
  }
`;

interface OwnProps {
  lang: string;
  categories: Array<Category>;
}

interface DispatchProps {
  fetchLatestRecipes: Function;
}

interface StateProps {
  latestRecipes: Array<Recipe>;
}

type RecentsProps = StateProps & OwnProps & DispatchProps;

interface OwnStates {
  latestRecipesLoaded: boolean;
}

class Recents extends React.Component<RecentsProps, OwnStates> {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    lang: PropTypes.string.isRequired,
  };

  constructor(props: RecentsProps) {
    super(props);
    this.state = {
      latestRecipesLoaded: false,
    };
  }

  shouldComponentUpdate() {
    return !this.state.latestRecipesLoaded;
  }

  componentDidMount() {
    this.props
      .fetchLatestRecipes(this.props.lang, this.props.categories, 5) // Order by 'date', max 5 results
      .then(() => {
        this.setState({ latestRecipesLoaded: true });
      })
      .catch(() => {});
  }

  render() {
    //Get first 5 recipes
    const recipeItems = this.state.latestRecipesLoaded
      ? this.props.latestRecipes.map((recipe) => (
          <Row key={recipe.id}>
            <Col>
              <a href={"/#/recipe/" + recipe.id}>
                <Line>{recipe.title}</Line>
              </a>
            </Col>
          </Row>
        ))
      : null;
    return (
      <Container>
        <Row>
          <Col>
            <Header>
              <FormattedMessage id="home.footer.recents.title" />
            </Header>
          </Col>
        </Row>
        {recipeItems}
      </Container>
    );
  }
}

const mapStateToProps = (state: RootState): StateProps => ({
  latestRecipes: state.latestRecipes.items,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchLatestRecipes: (
    lang: string,
    categories: Array<Category>,
    limit: number
  ) =>
    dispatch(
      fetchRecipes(lang, categories, undefined, undefined, "date", limit)
    ),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(Recents);
