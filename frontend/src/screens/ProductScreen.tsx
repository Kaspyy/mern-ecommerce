import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import {
  Row,
  Col,
  Image,
  ListGroup,
  Card,
  Button,
  Form,
} from 'react-bootstrap';
import Rating from '../components/Card/Rating';
import {
  listProductDetails,
  createProductReview,
} from '../store/actions/productActions';
import Loader from '../components/UI/Loader';
import Message from '../components/UI/Message';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { PRODUCT_CREATE_REVIEW_RESET } from '../store/constants/productConstants';
import { Review } from '../types/types';
import Meta from '../components/UI/Meta';

const ProductScreen = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [qty, setQty] = useState(1);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const dispatch = useAppDispatch();

  const productDetails = useAppSelector((state: any) => state.productDetails);
  const { product, loading, error } = productDetails;

  const userLogin = useAppSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  const productReviewCreate = useAppSelector(
    (state: any) => state.productReviewCreate
  );
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  useEffect(() => {
    if (successProductReview) {
      alert('Review Submitted!');
      setRating(0);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }

    dispatch(listProductDetails(id!) as any);
  }, [dispatch, id, successProductReview]);

  const addToCartHandler = () => {
    navigate('/cart/' + id + '?qty=' + qty);
  };

  const submitHandler = (e: any) => {
    e.preventDefault();
    dispatch(
      createProductReview(id!, {
        rating,
        comment,
      }) as any
    );
  };

  return (
    <>
      <Link className='btn btn-light my-3' to='/'>
        Go Back
      </Link>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <Meta title={product!.name} />
          <Row>
            <Col md={6}>
              <Image src={product?.image} alt={product?.name} fluid />
            </Col>
            <Col md={3}>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h3>{product?.name}</h3>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Rating
                    value={product?.rating}
                    text={`${product?.numReviews} reviews`}
                  />
                </ListGroup.Item>
                <ListGroup.Item>Price: ${product?.price}</ListGroup.Item>
                <ListGroup.Item>
                  Description: {product?.description}
                </ListGroup.Item>
              </ListGroup>
            </Col>
            <Col>
              <Card>
                <ListGroup variant='flush'>
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>
                        <strong>${product?.price}</strong>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product?.countInStock > 0
                          ? 'In Stock'
                          : 'Out of Stock'}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {product?.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity:</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={e => setQty(+e.target.value)}
                          >
                            {[...Array(product?.countInStock).keys()].map(
                              (_, i) => (
                                <option key={i} value={i + 1}>
                                  {i + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Row>
                      <Button
                        onClick={addToCartHandler}
                        variant='primary'
                        type='button'
                        disabled={product?.countInStock === 0}
                      >
                        Add to Cart
                      </Button>
                    </Row>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6} className='mt-4'>
              <h2>Reviews</h2>
              {product?.reviews.length === 0 && <Message>No Reviews</Message>}
              <ListGroup variant='flush'>
                {product?.reviews.map((review: Review) => (
                  <ListGroup.Item key={review._id}>
                    <strong>{review.name}</strong>
                    <Rating value={review.rating} />
                    <p>{review.createdAt.substring(0, 10)}</p>
                    <p>{review.comment}</p>
                  </ListGroup.Item>
                ))}
                <ListGroup.Item>
                  <h2>Write a Customer Review</h2>
                  {errorProductReview && (
                    <Message variant='danger'>{errorProductReview}</Message>
                  )}
                  {userInfo ? (
                    <Form onSubmit={submitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Rating</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={e => setRating(+e.target.value)}
                        >
                          <option value=''>Select...</option>
                          <option value='1'>1 - Poor</option>
                          <option value='2'>2 - Fair</option>
                          <option value='3'>3 - Good</option>
                          <option value='4'>4 - Very Good</option>
                          <option value='5'>5 - Excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label className='mt-3'>Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={e => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button type='submit' variant='primary' className='mt-3'>
                        Submit
                      </Button>
                    </Form>
                  ) : (
                    <Message>
                      Please <Link to='/login'>sign in</Link> to write a review
                    </Message>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};
export default ProductScreen;
