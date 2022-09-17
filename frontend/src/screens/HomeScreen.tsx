import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Col, Row } from 'react-bootstrap';
import { listProducts } from '../store/actions/productActions';
import { Product } from '../types/types';
import Loader from '../components/UI/Loader';
import ProductCard from '../components/Card/ProductCard';
import Message from '../components/UI/Message';
import Paginate from '../components/Layout/Paginate';
import { useParams } from 'react-router-dom';
import Meta from '../components/UI/Meta';

const HomeScreen = () => {
  const keyword = useParams<{ keyword: string }>().keyword;

  const pageNumber = useParams<{ pageNumber: string }>().pageNumber;

  const dispatch = useDispatch<any>();
  const productList = useSelector((state: any) => state.productList);
  const { loading, error, products, page, pages } = productList;

  useEffect(() => {
    dispatch(listProducts(keyword, pageNumber));
  }, [dispatch, keyword, pageNumber]);

  return (
    <>
      <Meta />
      {keyword && (
        <Link to='/' className='btn btn-light'>
          Go Back
        </Link>
      )}
      <h1>Latest Products</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Row>
            {products.map((product: Product) => (
              <Col key={product._id} sm={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
          <Paginate
            pages={pages}
            page={page}
            keyword={keyword ? keyword : ''}
          />
        </>
      )}
    </>
  );
};

export default HomeScreen;
