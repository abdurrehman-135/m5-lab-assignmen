import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";

const ShopNavbar = ({ itemCount }) => (
  <Navbar className="shop-header" expand="md">
    <Container className="py-3 text-white">
      <Navbar.Brand
        as={Link}
        to="/"
        className="shop-title d-flex align-items-center gap-2"
      >
        <i className="fa-solid fa-bag-shopping text-white" aria-hidden="true" />
        <span className="text-white">
          Shop 2 <span className="specialR">R</span>eact
        </span>
      </Navbar.Brand>
      <Nav className="ms-auto">
        <Nav.Link
          as={Link}
          to="/cart"
          className="shop-cart d-flex align-items-center gap-2"
          aria-label={`Cart with ${itemCount} items`}
        >
          <i className="fa-solid fa-cart-shopping" aria-hidden="true" />
          <span>{itemCount} item{itemCount === 1 ? "" : "s"}</span>
        </Nav.Link>
      </Nav>
    </Container>
  </Navbar>
);

export default ShopNavbar;
