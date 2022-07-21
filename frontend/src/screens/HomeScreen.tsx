import { useState, useEffect } from 'react';
import { Col, Row } from 'react-bootstrap';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import axios from 'axios';

const HomeScreen = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await axios.get('/api/products');

      setProducts(data);
    };

    fetchProducts();
  }, []);

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
