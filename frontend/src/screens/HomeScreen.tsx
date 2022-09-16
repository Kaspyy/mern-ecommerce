import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { listProducts } from '../store/actions/productActions';
import { Product } from '../types/types';
import Loader from '../components/UI/Loader';
import ProductCard from '../components/Card/ProductCard';
import Message from '../components/UI/Message';
import { useParams } from 'react-router-dom';

const HomeScreen = () => {
  const keyword = useParams<{ keyword: string }>().keyword;

  const dispatch = useDispatch<any>();
  const productList = useSelector((state: any) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword));
  }, [dispatch, keyword]);

  return (
    <>
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Row>
          {products.map((product: Product) => (
            <Col key={product._id} sm={12} md={6} lg={4}>
              <ProductCard product={product} />
            </Col>
          ))}
        </Row>
      )}
    </>
  );
};

export default HomeScreen;
