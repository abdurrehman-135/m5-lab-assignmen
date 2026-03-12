import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Badge from "react-bootstrap/Badge";

const Cart = ({ products, quantities }) => {
  const items = products.filter((product) => (quantities[product.id] ?? 0) > 0);

  return (
    <section aria-label="Shopping cart">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <h2 className="mb-0 cart-title">Your Cart</h2>
        <span className="text-muted small">
          {items.length === 0
            ? "No items yet"
            : `${items.length} product${items.length === 1 ? "" : "s"}`}
        </span>
      </div>

      {items.length === 0 ? (
        <div className="empty-cart text-center py-5">
          <i className="fa-solid fa-basket-shopping empty-cart-icon" />
          <p className="mt-3 mb-0 text-muted">
            Your cart is empty. Add items from the home page.
          </p>
        </div>
      ) : (
        <div className="d-grid gap-3">
          {items.map((product) => (
            <Card key={product.id} className="shadow-sm">
              <Card.Body>
                <Row className="align-items-center g-3">
                  <Col xs={12} md={3} className="text-center text-md-start">
                    <img
                      className="cart-image"
                      src={product.image}
                      alt={product.name}
                    />
                  </Col>
                  <Col xs={12} md={6}>
                    <h3 className="h5 mb-1">{product.name}</h3>
                    <p className="text-muted small mb-2">{product.desc}</p>
                    <div className="d-flex flex-wrap align-items-center gap-2">
                      {/* `<span className="product-price">{product.value}</span>` */}
                      {/* <span className="rating-chip">
                        <i className="fa-solid fa-star" aria-hidden="true" />
                        <span className="ms-1">{product.ratings} / 5</span>
                      </span> */}
                    </div>
                  </Col>
                  <Col xs={12} md={3} className="text-md-end">
                    <div className="text-uppercase text-muted small">
                      Quantity
                    </div>
                    <Badge bg="secondary" className="mt-1 px-3 py-2">
                      {quantities[product.id]}
                    </Badge>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </section>
  );
};

export default Cart;
