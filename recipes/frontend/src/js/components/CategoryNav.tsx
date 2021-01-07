/**
 * @author Christian Visintin <christian.visintin1997@gmail.com>
 * @version 0.1.0
 * @license "please refer to <http://unlicense.org>"
 */

import React from "react";
import { Nav } from "react-bootstrap";
import PropTypes from "prop-types";

import { Category } from "../lib/data/category";

interface OwnProps {
  categories: Array<Category>;
  onCategorySelect: Function;
}

interface OwnStates {}

export default class CategoryNav extends React.Component<OwnProps, OwnStates> {
  static propTypes = {
    categories: PropTypes.array.isRequired,
    onCategorySelect: PropTypes.func.isRequired,
  };

  constructor(props: OwnProps) {
    super(props);
    this.state = {};
  }

  render() {
    const categories = this.props.categories.map((category) => (
      <Nav.Item key={category.id}>
        <Nav.Link eventKey={category.name}>{category.name}</Nav.Link>
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
        {categories}
      </Nav>
    );
  }
}

/*
<Nav.Item>
        <Nav.Link
          hidden={this.props.search === null}
          onClick={(ev: any) => this.props.resetSearch()}
        >
          <Badge variant="secondary">
            {this.props.search}&nbsp;
            <Badge variant="light">X</Badge>
          </Badge>
        </Nav.Link>
      </Nav.Item>
      */
