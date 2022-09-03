import { useEffect } from 'react';
import { Table, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import { listOrders } from '../store/actions/orderActions';
import { Order, User } from '../types/types';
import { LinkContainer } from 'react-router-bootstrap';
import { useNavigate } from 'react-router-dom';

type OrderList = {
  loading: boolean;
  error: string | null;
  orders: Order[];
};

type UserLogin = {
  userInfo: User | null;
};

const OrderListScreen = () => {
  const navigate = useNavigate();
  const distpach = useAppDispatch();

  const orderList: OrderList = useAppSelector((state: any) => state.orderList);
  const { loading, error, orders } = orderList;

  const userLogin: UserLogin = useAppSelector((state: any) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      navigate('/login');
    }
    distpach(listOrders() as any);
  }, [distpach, navigate, userInfo]);

  return (
    <>
      <h1>Orders</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>ID</th>
              <th>USER</th>
              <th>DATE</th>
              <th>TOTAL</th>
              <th>PAID</th>
              <th>DELIVERED</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.user && order.user.name}</td>
                <td>{order.createdAt?.substring(0, 10)}</td>
                <td>${order.totalPrice}</td>
                <td>
                  {order.isPaid ? (
                    order.paidAt?.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  {order.isDelivered ? (
                    order.deliveredAt?.substring(0, 10)
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
                <td>
                  <LinkContainer to={`/order/${order._id}`}>
                    <Button variant='secondary' className='btn-sm'>
                      Details
                    </Button>
                  </LinkContainer>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
};

export default OrderListScreen;
