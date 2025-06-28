import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { addProducts } from "../../redux/productSlice";
import { FetchData } from "../api";
import { useDispatch, useSelector } from "react-redux";
import "./product.css";
import { useEffect } from "react";
import { ClipLoader } from "react-spinners";
import { addToCart, removeFromCart } from "../../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

export const ProductList = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { items, skip } = useSelector((state) => state.product);
  const cartItems = useSelector((state) => state.cart.cartItems);

  useEffect(() => {
    if (items.length === 0) {
      FetchData(0).then((data) => dispatch(addProducts(data)));
    }
  }, []);

  const loadMore = () => {
    FetchData(skip).then((data) => dispatch(addProducts(data)));
  };

  const isCartEmpty = (id) => {
    return cartItems.some((item) => item.id === id);
  };

  return (
    <Container className="clipboard-scroll">
      <InfiniteScroll
        dataLength={items.length}
        next={loadMore}
        hasMore={true}
        loader={
          <div className="d-flex justify-content-center align-items-center my-4">
            <ClipLoader color="yellow" size={65} />
          </div>
        }
      >
        <Row className="g-4 mt-3">
          {items.map((item, index) => {
            const originalPrice = Math.floor(
              item.price / (1 - item.discountPercentage / 100)
            );

            return (
              <Col md={4} key={index}>
                <Card className="h-100 card">
                  <Card.Body
                    className="d-flex flex-column align-items-center text-center"
                    onClick={(e) => {
                      if (!e.target.closest("button")) {
                        navigate(`/product-details/${item.id}`);
                      }
                    }}
                    style={{ cursor: "pointer" }}
                  >
                    <Card.Img
                      variant="top"
                      src={item.thumbnail}
                      style={{
                        height: "200px",
                        width: "250px",
                        objectFit: "contain",
                      }}
                      className="mx-auto pt-3"
                    />

                    <Card.Title className="twoLine">
                      <b>
                        {item.title} | {item.description}
                      </b>
                    </Card.Title>

                    <p className="text-warning mb-1">
                      <FaStar />{" "}
                      {item.rating ? Number(item.rating.toFixed(1)) : "N/A"}
                    </p>

                    <p className="mb-1">
                      <b>₹{item.price}</b>{" "}
                      <span className="text-muted text-decoration-line-through ms-2">
                        ₹{originalPrice}
                      </span>{" "}
                      <span className="text-success fw-bold">
                        ({item.discountPercentage}% off)
                      </span>
                    </p>

                    <p className="text-secondary small">
                      FREE {item.shippingInformation}
                    </p>

                    <Button
                      onClick={(e) => {
                        e.stopPropagation(); 
                        isCartEmpty(item.id)
                          ? dispatch(removeFromCart(item.id))
                          : dispatch(addToCart(item));
                      }}
                      className={`btn w-100 mt-auto ${
                        isCartEmpty(item.id) ? "btn-red" : "btn-warning"
                      }`}
                    >
                      <b>
                        {isCartEmpty(item.id)
                          ? "Remove from cart"
                          : "Add to Cart"}
                      </b>
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </InfiniteScroll>
    </Container>
  );
};
