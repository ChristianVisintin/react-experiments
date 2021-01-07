/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";
import { FormattedMessage } from "react-intl";
import styled from "styled-components";

import { Category } from "../lib/data/category";

const CategoryLink = styled(Nav.Link)`
  text-transform: capitalize;
`;

interface OwnProps {
  categories: Array<Category>;
  onCategorySelect: Function;
  onCategoryReset: Function;
}

interface OwnStates {}

export default class CategoryNav extends React.Component<OwnProps, OwnStates> {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    onCategorySelect: PropTypes.func.isRequired,
    onCategoryReset: PropTypes.func.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = this.props.categories.map((category) => (
      <Nav.Item key={category.id}>
        <CategoryLink eventKey={category.name}>{category.name}</CategoryLink>
      </Nav.Item>
    ));
    return (
      <Nav
        className="justify-content-center"
        activeKey="all"
        onSelect={(ev) => {
          if (ev) {
            this.props.onCategorySelect(ev);
          }
        }}
      >
        <CategoryLink key="all"
          onClick={() => this.props.onCategoryReset()}
        >
          <FormattedMessage id="recipes.viewAll"/>
        </CategoryLink>
        {categories}
      </Nav>
    );
  }
}
