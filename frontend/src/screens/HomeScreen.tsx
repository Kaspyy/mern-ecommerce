import { Col, Row } from 'react-bootstrap';
import ProductCard from '../components/ProductCard';
import products from '../../../backend/data/products';

const HomeScreen = () => {
  return (
    <>
      <h1>Latest Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product._id} sm={12} md={6} lg={4}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default HomeScreen;
