/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Badge, Card, Carousel, Row } from "react-bootstrap";
import { FormattedDate } from "react-intl";
import styled from "styled-components";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { ThunkDispatch } from "redux-thunk";

//Actions
import { fetchRecipes, getRecipe, likeRecipe } from "../actions/recipeActions";

//Classes
import Recipe from "../lib/data/recipe";
import RecipeLoader from "../components/RecipeLoader";
import LikeBadge from "../components/LikeBadge";
import { Category } from "../lib/data/category";
import { RootState } from "../store/index";

// Components
const RecipeCard = styled(Card)`
  margin-top: 3em;
  margin-bottom: 3em;
  padding: 3em 5em 3em 5em;
  border: 1px solid #c0c0c0;
`;

const RecipePicture = styled(Card.Img)`
  border-radius: 0.7em;
`;

const RecipeTitle = styled(Card.Title)`
  font-size: 2.5em;
`;

const RecipeSection = styled(Card.Title)`
  font-size: 1.8em;
  color: #404040;
`;

const RecipeDate = styled(Card.Title)`
  font-size: 0.8em;
  color: #808080;
`;

const IngredientList = styled.ul`
  list-style-type: circle;
`;

const IngredientName = styled.h4`
  font-size: 1em;
  color: #404040;
  display: inline-block;
  margin-right: 1ch;
`;

const IngredientQuantity = styled.h5`
  font-size: 0.9em;
  color: #606060;
  display: inline-block;
`;

// Props
interface OwnProps {
  recipeId: string;
  lang: string;
  categories: Array<Category>;
}

interface DispatchProps {
  fetchRecipes: Function;
  getRecipe: Function;
  likeRecipe: Function;
}

interface StateProps {
  recipe: Recipe;
  related: Array<Recipe>;
}

type RecipeProps = StateProps & OwnProps & DispatchProps;

// States
interface OwnStates {
  recipeLoaded: boolean;
  relatedLoaded: boolean;
  recipeId: string;
}

class RecipeView extends React.Component<RecipeProps, OwnStates> {
  static propTypes = {
    recipeId: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
    categories: PropTypes.array.isRequired,
  };

  constructor(props: RecipeProps) {
    super(props);
    this.state = {
      recipeLoaded: false,
      relatedLoaded: false,
      recipeId: props.recipeId,
    };
    this.likeRecipe = this.likeRecipe.bind(this);
  }

  render() {
    if (this.state.recipeLoaded) {
      return this.buildRecipe(this.props.recipe, this.props.related);
    } else {
      // Return loader
      return <RecipeLoader />;
    }
  }

  componentDidMount() {
    // Load recipe
    this.getRecipe();
  }

  /**
   * @description build recipe component
   * @param {Recipe} recipe
   * @param {Array<Recipe>} related
   * @returns {React.Node}
   */
  buildRecipe(recipe: Recipe, related: Array<Recipe>): React.ReactNode {
    const relatedRecipes = this.state.relatedLoaded
      ? related.map((recipe) => (
          <React.Fragment key={recipe.id}>
            <Card.Text>&nbsp;•&nbsp;</Card.Text>
            <Card.Link href={"/#/recipe/" + recipe.id} onClick={() => this.newRecipe(recipe.id)}>
              {recipe.title}
            </Card.Link>
          </React.Fragment>
        ))
      : null;
    //Prepare pictures
    const recipePictures = this.props.recipe.img.map((img) => (
      <Carousel.Item key={img}>
        <RecipePicture className="border" variant="top" src={img} />
      </Carousel.Item>
    ));
    //Prepare categories
    const categories = recipe.categories.map((tag, index) => (
      <React.Fragment key={index}>
        <Badge variant="secondary">#{tag}</Badge>
        &nbsp;
      </React.Fragment>
    ));
    // Prepare ingredients
    const ingredients = recipe.ingredients
      ? recipe.ingredients.map((ingredient, index) => {
          return (
            <li key={index}>
              <IngredientName>{ingredient.name}</IngredientName>
              <IngredientQuantity>
                {ingredient.quantity}&nbsp;{ingredient.measure}
              </IngredientQuantity>
            </li>
          );
        })
      : null;
    return (
      <div className="row align-items-center">
        <RecipeCard className="col-md-6 offset-md-3">
          <RecipeDate>
            <FormattedDate
              value={recipe.date}
              year="numeric"
              month="long"
              day="numeric"
            />
          </RecipeDate>
          <RecipeTitle>{recipe.title}</RecipeTitle>
          <Card.Text>{categories}</Card.Text>
          <Carousel className="d-block" interval={5000}>
            {recipePictures}
          </Carousel>
          <Card.Body>
            <RecipeSection>
              <FormattedMessage id="recipes.ingredientsKey" />
            </RecipeSection>
            <IngredientList>{ingredients}</IngredientList>
            <RecipeSection>
              <FormattedMessage id="recipes.preparation" />
            </RecipeSection>
            <Card.Text>{recipe.body}</Card.Text>
          </Card.Body>
          <hr />
          <Row className="d-flex flex-row-reverse">
            <LikeBadge likes={this.state.recipeLoaded ? (this.props.recipe.likes ? this.props.recipe.likes : 0) : 0} onLike={this.likeRecipe}/>
          </Row>
          <div className="d-flex flex-row-reverse">
            <Row>
              <Card.Link href="/#/recipes">
                <FormattedMessage id="recipes.recipes" />
              </Card.Link>
              {relatedRecipes}
            </Row>
          </div>
          <hr />
        </RecipeCard>
      </div>
    );
  }

  /**
   * @description change recipe
   * @param {string} id 
   */

  newRecipe(id: string) {
    this.setState({relatedLoaded: false, recipeLoaded: false, recipeId: id}, this.getRecipe);
  }

  /**
   * @description get recipe and related and save them to state
   */

  getRecipe() {
    // Load recipe
    this.props
      .getRecipe(this.props.lang, this.props.categories, this.state.recipeId)
      .then(() => {
        //Once recipes have been loaded, set recipe loaded to true
        this.setState({ recipeLoaded: true }, () => {
          // Load related
          const category: string | undefined = this.props.categories[0]
            ? this.props.categories[0].name
            : undefined;
          // Related recipe: title likes recipe, has the same first category, shuffle, limit 5
          this.props
            .fetchRecipes(
              this.props.lang,
              this.props.categories,
              category,
              4,
              true
            )
            .then(() => {
              this.setState({ relatedLoaded: true });
            })
            .catch(() => {});
        });
      })
      .catch(() => {});
  }

  /**
   * @description like current recipe
   */
  likeRecipe() {
    this.props.likeRecipe(this.props.lang, this.props.categories, this.props.recipeId).then(() => {
      console.log("ADESSO LA RICETTA GA LIKES", this.props.recipe.likes);
    });
  }

}

const mapStateToProps = (state: RootState): StateProps => ({
  related: state.relatedRecipes.items,
  recipe: state.recipes.item,
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>) => ({
  fetchRecipes: (
    lang: string,
    categories: Array<Category>,
    category: string | undefined = undefined,
    limit: number | undefined = undefined,
    shuffle: boolean = false
  ) =>
    dispatch(
      fetchRecipes(
        lang,
        categories,
        undefined,
        category,
        undefined,
        limit,
        undefined,
        shuffle
      )
    ),
  getRecipe: (lang: string, categories: Array<Category>, id: string) =>
    dispatch(getRecipe(lang, categories, id)),
  likeRecipe: (lang: string, categories: Array<Category>, id: string) =>
    dispatch(likeRecipe(lang, categories, id)),
});

export default connect<StateProps, DispatchProps, OwnProps>(
  mapStateToProps,
  mapDispatchToProps
)(RecipeView);
