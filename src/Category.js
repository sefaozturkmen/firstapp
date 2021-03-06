import React, { Component } from "react";
import { ListGroup, ListGroupItem } from "reactstrap";

class Category extends Component {
  state = {
    categories: [],
  };
    componentDidMount(){
      this.getCategories();
    }
  
    categoryPath="http://localhost:3000/categories"

    getCategories = ()=> {
      fetch(this.categoryPath)
      .then(response => response.json())
      .then(data =>this.setState({categories:data}));
    }
    


  render() {
    return (
      <div>
        <h3>{this.props.info.title}</h3>
        <ListGroup>
          {this.state.categories.map((category) => (
            <ListGroupItem key={category.id} onClick={()=> this.props.changeCategory(category)} >
              {category.categoryName}
            </ListGroupItem>
          ))}
        </ListGroup>
        <h4> {this.props.currentCategory} </h4>
      </div>
    );
  }
}

export default Category;
