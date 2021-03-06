import { Component } from "react";
import Navi from "./Navi";
import Product from "./Product";
import Category from "./Category";
import "./App.css";
import { Col, Container, Row } from "reactstrap";

class App extends Component {
  state = { currentCategory: "", products: [] };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id );
  };

  getProducts = (categoryId) => {
    let productsPath = "http://localhost:3000/products";
    if (categoryId) {
      productsPath += "?categoryId=" + categoryId;
    }
    fetch(productsPath)
      .then((response) => response.json())
      .then((data) => this.setState({ products: data }));
  };

  render() {
    var categoryInfo = { title: "Category List" };
    var productInfo = { title: "Product List" };
    return (
      <div>
        <Container>
          <Row>
            <Col xs="12">
              <Navi />
            </Col>
          </Row>
          <Row>
            <Col xs="4">
              <Category
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="8">
              <Product
                products={this.state.products}
                currentCategory={this.state.currentCategory}
                info={productInfo}
              />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

export default App;
