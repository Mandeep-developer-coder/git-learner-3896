import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { useSelector } from "react-redux";
import './index.css';

export const Navbar = () => {
  const cartCount = useSelector((state) => state.cart.cartItems.length);

  return (
    <Container fluid>
      <Row className="align-items-center bg-dark justify-content-between px-4 py-2">
        <Col className="d-flex align-items-center gap-4">
          <p className="text-white fw-bold fs-3 m-0">QuickCart</p>

          <Link to="/" className="text-secondary fs-4 m-0 nav-item text-decoration-none">
            Home
          </Link>

          <Link to="/cart" className="text-secondary fs-4 m-0 nav-item text-decoration-none">
            Cart
          </Link>
        </Col>

        <Col xs="auto" className="d-flex align-items-center position-relative">
        <Link to="/cart" className="text-secondary fs-5 m-0 nav-item text-decoration-none">
          <FaShoppingCart size={22} className="me-2 text-secondary" />
          {cartCount > 0 && (
            <span className="badge bg-primary rounded-circle position-absolute navbar-cart-badge">
              {cartCount}
            </span>
          )}
          <span className="fw-bold text-white">Cart</span>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
