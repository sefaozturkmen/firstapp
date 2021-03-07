import React, { Component } from "react";
import {
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  UncontrolledDropdown,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
class CartSummary extends Component {
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          Your Cart - {this.props.cart.length}
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger" onClick={()=> this.props.removeFromCart(cartItem.product)}> X </Badge>
              {cartItem.product.productName}
              <Badge color="success"> {cartItem.quantity} </Badge>
            </DropdownItem>
          ))}
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }
  renderEmptyCart() {
    return (
      <NavItem>
        <NavLink>Empty Cart</NavLink>
      </NavItem>
    );
  }
  render() {
    return (
      <div>
        {this.props.cart.length > 0
          ? this.renderSummary()
          : this.renderEmptyCart()}
      </div>
    );
  }
}

export default CartSummary;
