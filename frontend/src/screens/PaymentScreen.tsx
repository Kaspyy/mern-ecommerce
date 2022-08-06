import { ChangeEvent, useState } from 'react';
import { Form, Button, Col } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import FormContainer from '../components/UI/FormContainer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { savePaymentMethod } from '../store/actions/cartActions';

const PaymentScreen = () => {
  const navigate = useNavigate();
  const cart = useAppSelector((state: any) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    navigate('/shipping');
  }

  const [paymentMethod, setPaymentMethod] = useState('PayPal');

  const dispatch = useAppDispatch();

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(savePaymentMethod(paymentMethod) as any);
    navigate('/placeorder');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment method</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group>
          <Form.Label as='legend'>Select method</Form.Label>
          <Col>
            <Form.Check
              id='PayPal'
              type='radio'
              label='PayPal or Credit Card'
              name='paymentMethod'
              value='PayPal'
              onChange={e => setPaymentMethod(e.target.value)}
              checked
            />
          </Col>
          <Col>
            {/* <Form.Check
              id='Stripe'
              type='radio'
              label='Stripe'
              name='paymentMethod'
              value='Stripe'
              onChange={e => setPaymentMethod(e.target.value)}
            /> */}
          </Col>
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default PaymentScreen;
