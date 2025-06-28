import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {Container, Row,Carousel, Col,Badge,Table} from "react-bootstrap";

import { FaStar } from "react-icons/fa"; 
import { useSelector } from "react-redux";
import "./detail.css";

export const ProductDetail = () => {
  const { id } = useParams();
  const reduxProducts = useSelector((state) => state.product.items);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const localProduct = reduxProducts.find((p) => p.id === parseInt(id));
    if (localProduct) {
      setProduct(localProduct);
    } else {
      fetch(`https://dummyjson.com/products/${id}`)
        .then((res) => res.json())
        .then((data) => setProduct(data))
        .catch((err) => console.log(err));
    }
  }, [id, reduxProducts]);

  if (!product) {
    return <div className="text-center mt-5">Loading...</div>;
  }

  const {
    title,
    brand,
    description,
    price,
    discountPercentage,
    rating,
    stock,
    dimensions,
    weight,
    shippingInformation,
    warrantyInformation,
    returnPolicy,
    sku,
    tags,
    images,
    thumbnail
  } = product;

  const originalPrice = Math.floor(price / (1 - discountPercentage / 100));

  return (
    <Container
      className="mt-4 product-detail-container"
      style={{ background: "#f8f8f8", padding: "20px", borderRadius: "10px" }}
    >
      <Row className="align-items-start">
        {/* Left */}
        <Col md={6}>
          <div style={{ padding: "10px", borderRadius: "10px" }}>
            {images && images.length > 1 ? (
              <Carousel variant="dark">
                {images.map((img, idx) => (
                  <Carousel.Item key={idx}>
                    <div style={{ background: "#fff", borderRadius: "10px" }}>
                      <img
                        src={img}
                        className="d-block w-100"
                        alt={`Slide ${idx}`}
                        style={{
                          height: "500px",
                          objectFit: "contain",
                          borderRadius: "10px"
                        }}
                      />
                    </div>
                  </Carousel.Item>
                ))}
              </Carousel>
            ) : (
              <img
                src={thumbnail}
                className="img-fluid ms-3"
                alt={title}
                style={{
                  height: "500px",
                  objectFit: "contain",
                  background: "#fff",
                  borderRadius: "10px",
                  width: "600px"
                }}
              />
            )}
          </div>
        </Col>

        {/* Right */}
        <Col md={6}>
          <h4>{title}</h4>
          <p className="text-muted mb-1">{brand}</p>

          <div className="mb-2">
            <Badge bg="success" className="me-2">
              {stock < 10 ? "Low Stock" : "In Stock"}
            </Badge>
            {tags?.map((tag, i) => (
              <Badge key={i} bg="info" className="me-1 text-capitalize">
                {tag}
              </Badge>
            ))}
          </div>

          <p>{description}</p>

          <h4 className="text-primary">
            ${price}{" "}
            <small className="text-muted fs-5 text-decoration-line-through">
              ${originalPrice}
            </small>
            <Badge bg="danger" className="ms-2">
              {discountPercentage.toFixed(2)}% OFF
            </Badge>
          </h4>

          <Table bordered size="sm" className="mt-3 bg-white">
            <tbody>
              <tr>
                <td>
                  <b>Rating:</b>
                </td>
                <td>
                  <FaStar className="text-warning" /> {rating}
                </td>
              </tr>
              <tr>
                <td>
                  <b>Stock:</b>
                </td>
                <td>{stock} items</td>
              </tr>
              {dimensions && (
                <tr>
                  <td>
                    <b>Dimensions:</b>
                  </td>
                  <td>
                    {dimensions?.width}W × {dimensions?.height}H ×{" "}
                    {dimensions?.depth}D
                  </td>
                </tr>
              )}
              {weight && (
                <tr>
                  <td>
                    <b>Weight:</b>
                  </td>
                  <td>{weight} kg</td>
                </tr>
              )}
              {shippingInformation && (
                <tr>
                  <td>
                    <b>Shipping:</b>
                  </td>
                  <td>{shippingInformation}</td>
                </tr>
              )}
              {warrantyInformation && (
                <tr>
                  <td>
                    <b>Warranty:</b>
                  </td>
                  <td>{warrantyInformation}</td>
                </tr>
              )}
              {returnPolicy && (
                <tr>
                  <td>
                    <b>Return Policy:</b>
                  </td>
                  <td>{returnPolicy}</td>
                </tr>
              )}
              {sku && (
                <tr>
                  <td>
                    <b>SKU:</b>
                  </td>
                  <td>{sku}</td>
                </tr>
              )}
              {tags && (
                <tr>
                  <td>
                    <b>Tags:</b>
                  </td>
                  <td>
                    {tags.map((tag, index) => (
                      <Badge key={index} bg="secondary" className="me-2">
                        {tag}
                      </Badge>
                    ))}
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>

      {/* 👇 Customer Reviews Section */}
      <div className="mt-5 bg-light p-4 rounded">
        <h5 className="mb-4">📢 Customer Reviews</h5>

        <div className="review-box p-3 bg-white rounded mb-3 shadow-sm">
          <strong>
            <FaStar className="text-warning me-1" /> 4 - Mateo Bennett
          </strong>
          <p className="mb-1">Would buy again!</p>
          <small className="text-muted">
            30/04/2025 | mateo.bennett@x.dummyjson.com
          </small>
        </div>

        <div className="review-box p-3 bg-white rounded mb-3 shadow-sm">
          <strong>
            <FaStar className="text-warning me-1" /> 4 - Nolan Gonzalez
          </strong>
          <p className="mb-1">Highly recommended!</p>
          <small className="text-muted">
            30/04/2025 | nolan.gonzalez@x.dummyjson.com
          </small>
        </div>

        <div className="review-box p-3 bg-white rounded shadow-sm">
          <strong>
            <FaStar className="text-warning me-1" /> 5 - Aurora Lawson
          </strong>
          <p className="mb-1">Very happy with my purchase!</p>
          <small className="text-muted">
            30/04/2025 | aurora.lawson@x.dummyjson.com
          </small>
        </div>
      </div>
    </Container>
  );
};
