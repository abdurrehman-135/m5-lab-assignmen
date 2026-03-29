import { useMemo, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";

const PRICE_FORMATTER = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const DisplayProducts = ({ products, quantities, onAdd, onSubtract }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);
  const [sortOption, setSortOption] = useState("normal");

  const sortedProducts = useMemo(() => {
    const arrangedProducts = [...products];

    switch (sortOption) {
      case "lowest":
        arrangedProducts.sort((firstProduct, secondProduct) => {
          return firstProduct.price - secondProduct.price;
        });
        break;
      case "highest":
        arrangedProducts.sort((firstProduct, secondProduct) => {
          return secondProduct.price - firstProduct.price;
        });
        break;
      default:
        arrangedProducts.sort((firstProduct, secondProduct) => {
          return firstProduct.id - secondProduct.id;
        });
        break;
    }

    return arrangedProducts;
  }, [products, sortOption]);

  const handleShow = (product) => {
    setActiveProduct(product);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
    setActiveProduct(null);
  };

  return (
    <>
      <section aria-label="Product list" className="product-list-section">

        {/* Center the content */}
        <div className="product-toolbar d-flex justify-content-center">
          <Form.Group
            className="product-sort-control d-flex align-items-center gap-2"
            controlId="sort-products"
          >
            <Form.Label className="product-sort-label mb-0">
              Sort by
            </Form.Label>

            <Form.Select
              value={sortOption}
              onChange={(event) => setSortOption(event.target.value)}
              aria-label="Sort products"
              style={{ width: "auto" }}
            >
              <option value="normal">Normal</option>
              <option value="lowest">Lowest</option>
              <option value="highest">Highest</option>
            </Form.Select>
          </Form.Group>
        </div>

        <Row className="g-4">
          {sortedProducts.map((product) => (
            <Col xs={12} md={6} key={product.id}>
              <Card className="h-100 shadow-sm product-card">
                <Card.Body className="d-flex gap-3 gap-md-4">
                  <button
                    type="button"
                    className="product-image-button"
                    onClick={() => handleShow(product)}
                    aria-label={`Open ${product.name} details`}
                  >
                    <img
                      className="product-image"
                      src={product.image}
                      alt={product.name}
                    />
                  </button>

                  <div className="flex-grow-1">
                    <Card.Title className="shop-product-title mb-2">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="text-muted small mb-2">
                      {product.desc}
                    </Card.Text>

                    <div className="d-flex flex-wrap align-items-center gap-2 mb-3">
                      <span className="product-price">
                        {PRICE_FORMATTER.format(product.price)}
                      </span>
                      <span className="rating-chip">
                        <i className="fa-solid fa-star" aria-hidden="true" />
                        <span>{product.ratings} / 5</span>
                      </span>
                    </div>

                    <div className="d-flex align-items-center gap-2">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => onSubtract(product.id)}
                        aria-label={`Decrease ${product.name} quantity`}
                      >
                        <i className="fa-solid fa-minus" aria-hidden="true" />
                      </Button>
                      <span className="qty-count">
                        {quantities[product.id] ?? 0}
                      </span>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => onAdd(product.id)}
                        aria-label={`Increase ${product.name} quantity`}
                      >
                        <i className="fa-solid fa-plus" aria-hidden="true" />
                      </Button>
                    </div>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {activeProduct ? activeProduct.name : "Product Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {activeProduct ? (
            <div className="text-center">
              <img
                className="modal-product-image mb-3"
                src={activeProduct.image}
                alt={activeProduct.name}
              />
              <p className="product-price product-price-lg mb-2">
                {PRICE_FORMATTER.format(activeProduct.price)}
              </p>
              <p className="mb-2">{activeProduct.desc}</p>
              <div className="rating-chip rating-chip-lg mx-auto">
                <i className="fa-solid fa-star" aria-hidden="true" />
                <span>{activeProduct.ratings} / 5</span>
              </div>
            </div>
          ) : (
            <p className="mb-0">Select a product to see the details.</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default DisplayProducts;
