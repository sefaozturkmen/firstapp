import { Component } from "react";
import Navi from "./Navi";
import Product from "./Product";
import Category from "./Category";
import "./App.css";
import { Col, Container, Row } from "reactstrap";
import alertify from "alertifyjs"

class App extends Component {
  state = { currentCategory: "", products: [], cart: [] };

  componentDidMount() {
    this.getProducts();
  }

  changeCategory = (category) => {
    this.setState({ currentCategory: category.categoryName });
    this.getProducts(category.id);
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

  addToCart = (product) => {
    let newCart = this.state.cart;
    var addedItem = newCart.find((c) => c.product.id === product.id);
    if (addedItem) {
      addedItem.quantity += 1;
    } else {
      newCart.push({ product: product, quantity: 1 });
    }
    this.setState({ cart: newCart });
    alertify.success(product.productName+ " added to cart!");
  };

  removeFromCart=(product) =>{
    let newCart = this.state.cart.filter(cardItem=>cardItem.product.id!==product.id)
    this.setState({cart:newCart})
  }

  render() {
    var categoryInfo = { title: "Category List" };
    var productInfo = { title: "Product List" };
    return (
      <div>
        <Container>
          <Navi removeFromCart={this.removeFromCart} cart={this.state.cart} />
          <Row>
            <Col xs="3">
              <Category
                currentCategory={this.state.currentCategory}
                changeCategory={this.changeCategory}
                info={categoryInfo}
              />
            </Col>
            <Col xs="9">
              <Product
                products={this.state.products}
                addToCart={this.addToCart}
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
