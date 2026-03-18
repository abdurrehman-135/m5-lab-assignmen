import { Fragment } from "react";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";

const Cart = ({ products, quantities, itemCount }) => {
  const items = products.filter((product) => (quantities[product.id] ?? 0) > 0);

  return (
    <section aria-label="Shopping cart" className="cart-screen">
      <h2 className="mb-3 cart-title">Your Cart Items</h2>

      {items.length === 0 ? (
        <div className="cart-empty-state">
          <p className="cart-message">There are {itemCount} items in your cart.</p>
          <Button as={Link} to="/" className="shop-small-btn continue-btn">
            Continue Shop
          </Button>
        </div>
      ) : (
        <Fragment>
          <div className="cart-items-frame">
          {items.map((product) => (
            <div key={product.id} className="cart-line-item">
              <div className="cart-line-visual">
                <img
                  className="cart-image"
                  src={product.image}
                  alt={product.name}
                />
                <p className="cart-item-name">{product.name}</p>
              </div>
              <p className="cart-quantity">Quantity: {quantities[product.id]}</p>
            </div>
          ))}
          </div>

          <Button as={Link} to="/signin" className="shop-small-btn checkout-btn">
            Check Out
          </Button>
        </Fragment>
      )}
    </section>
  );
};

export default Cart;
