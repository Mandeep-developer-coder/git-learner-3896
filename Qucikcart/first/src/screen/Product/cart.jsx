import { useEffect, useState } from "react";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { FaTrash } from "react-icons/fa";
import { removeFromCart } from "../../redux/cartSlice";
import cartIcon from "../../assets/cart-icon.png";  

import "./cart.css";

export const CartAddRemove = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchAllProducts = async () => {
      const responses = await Promise.all(
        cartItems.map((item) =>
          fetch(`https://dummyjson.com/products/${item.id}`).then((res) =>
            res.json()
          )
        )
      );
      setProducts(responses);
    };

    if (cartItems.length > 0) {
      fetchAllProducts();
    } else {
      setProducts([]);
    }
  }, [cartItems]);

  const subtotal = products.reduce((acc, item) => acc + item.price, 0);

  return (
    <Container fluid className="cart-container px-5 py-4">
      <Row>
       
        <Col md={8} className="cart-left">
          <h4 className="mb-3 fw-semibold">Shopping Cart</h4>

          {products.length === 0 ? (
            <div className="empty-cart mt-5">
              <img src={cartIcon} alt="empty" className="empty-icon" />
              <br></br>
              <h4>Cart is Empty</h4>
            </div>
          ) : (
            products.map((product) => (
              <Card key={product.id} className="mb-3 shadow-sm">
                <Card.Body className="d-flex align-items-center justify-content-between">
                  <div className="d-flex align-items-center gap-3">
                    <img
                      src={product.thumbnail}
                      alt={product.title}
                      width="100"
                      height="100"
                      style={{ objectFit: "contain" }}
                    />
                    <div>
                      <h6 className="mb-0 fw-bold">{product.title}</h6>
                      <p className="mb-1 text-muted small">{product.brand}</p>
                      <p className="text-danger fw-bold mb-1">
                        ${product.price.toFixed(2)}{" "}
                        <Badge bg="warning" className="text-dark">
                          {product.discountPercentage.toFixed(2)}% OFF
                        </Badge>
                      </p>
                      <small className="text-success">In Stock</small>
                    </div>
                  </div>
                  <Button
                    variant="outline-danger"
                    onClick={() => dispatch(removeFromCart(product.id))}
                  >
                    <FaTrash />
                  </Button>
                </Card.Body>
              </Card>
            ))
          )}
        </Col>

    {/* subtotal */}
        {products.length > 0 && (
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Body>
                <h6 className="mb-3 fw-semibold">
                  Subtotal ({products.length} items):{" "}
                  <span className="text-success">${subtotal.toFixed(2)}</span>
                </h6>
                <Button
                  className="w-100 fw-semibold btn-warning"
                  style={{ backgroundColor: "#ffc107", border: "none" }}
                >
                  Proceed to Checkout
                </Button>
              </Card.Body>
            </Card>
          </Col>
        )}
      </Row>
    </Container>
  );
};
