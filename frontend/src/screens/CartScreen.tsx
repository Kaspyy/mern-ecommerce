import { useEffect } from 'react';
import {
  Col,
  ListGroup,
  Row,
  Image,
  Form,
  Button,
  Card,
} from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useLocation, useParams } from 'react-router-dom';
import { addToCart, removeFromCart } from '../store/actions/cartActions';
import Message from '../components/UI/Message';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { CartItem } from '../types';

const CartScreen = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const productId = id;
  const { search } = useLocation();
  const dispatch = useAppDispatch();
  const cartItems: CartItem[] = useAppSelector(
    state => state.cart['cartItems']
  );

  const qty = Number(search.split('=')[1]);

  useEffect(() => {
    if (productId) {
      //FIXME: solve this type error
      dispatch(addToCart(productId, qty) as any);
    }
  }, [dispatch, productId, qty]);

  const removeFromCartHandler = (productId: string) => {
    //FIXME: solve this type error
    dispatch(removeFromCart(productId) as any);
  };

  const checkoutHandler = () => {
    navigate('/login?redirect=/shipping');
  };

  return (
    <Row>
      <Col md={8}>
        <h1>Shopping Cart</h1>
        {cartItems.length === 0 ? (
          <Message>
            Your cart is empty. <Link to='/'>Go back</Link>
          </Message>
        ) : (
          <ListGroup variant='flush'>
            {cartItems.map(item => (
              <ListGroup.Item key={item.productId}>
                <Row>
                  <Col md={2}>
                    <Image src={item.image} alt={item.name} fluid rounded />
                  </Col>
                  <Col md={3}>
                    <Link
                      to={`/product/${item.productId}`}
                      style={{ textDecoration: 'none' }}
                    >
                      {item.name}
                    </Link>
                  </Col>
                  <Col md={2}>${item.price}</Col>
                  <Col md={2}>
                    <Form.Control
                      as='select'
                      value={item.qty}
                      onChange={e =>
                        // FIXME: solve this type error
                        dispatch(
                          addToCart(
                            item.productId,
                            Number(e.target.value)
                          ) as any
                        )
                      }
                    >
                      {[...Array(item?.countInStock).keys()].map((_, i) => (
                        <option key={i} value={i + 1}>
                          {i + 1}
                        </option>
                      ))}
                    </Form.Control>
                  </Col>
                  <Col md={2}>
                    <Button
                      type='button'
                      onClick={() =>
                        // FIXME: solve this type error
                        dispatch(removeFromCartHandler(item.productId) as any)
                      }
                    >
                      <i className='fas fa-trash'></i>
                    </Button>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        )}
      </Col>
      <Col md={4}>
        <Card>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h2>
                Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)}{' '}
                items)
              </h2>
              $
              {cartItems
                .reduce((acc, item) => acc + item.price * item.qty, 0)
                .toFixed(2)}
            </ListGroup.Item>
            <ListGroup.Item className='d-grid gap-2'>
              <Button
                type='button'
                className='btn-block'
                disabled={cartItems.length === 0}
                onClick={checkoutHandler}
              >
                Proceed to checkout
              </Button>
            </ListGroup.Item>
          </ListGroup>
        </Card>
      </Col>
    </Row>
  );
};

export default CartScreen;
