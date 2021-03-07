import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class Category extends Component {
  state = {
    categories: [],
  };
  componentDidMount() {
    this.getCategories();
  }

  

  getCategories = () => {
    let categoryPath = "http://localhost:3000/categories";
    fetch(categoryPath)
      .then((response) => response.json())
      .then((data) => this.setState({ categories: data }));
  };

  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem
              active={
                category.categoryName === this.props.currentCategory
                  ? true
                  : false
              }
              key={category.id}
              onClick={() => this.props.changeCategory(category)}
            >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
      </div>
    );
  }
}

export default Category;
