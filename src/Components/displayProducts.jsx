import { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const DisplayProducts = ({ products, quantities, onAdd, onSubtract }) => {
  const [showModal, setShowModal] = useState(false);
  const [activeProduct, setActiveProduct] = useState(null);

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
      <section aria-label="Product list">
        <Row className="g-4">
          {products.map((product) => (
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
                      {/* <span className="product-price">{product.value}</span> */}
                      {/* <span className="rating-chip">
                        <i className="fa-solid fa-star" aria-hidden="true" />
                        <span className="ms-1">{product.ratings} / 5</span>
                      </span> */}
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
              <p className="mb-2">{activeProduct.desc}</p>
              <div className="rating-chip rating-chip-lg mx-auto">
                <i className="fa-solid fa-star" aria-hidden="true" />
                <span className="ms-1">{activeProduct.ratings} / 5</span>
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
