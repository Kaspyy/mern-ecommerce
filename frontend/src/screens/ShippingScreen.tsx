import { ChangeEvent, useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import FormContainer from '../components/UI/FormContainer';
import CheckoutSteps from '../components/Checkout/CheckoutSteps';
import { useNavigate } from 'react-router-dom';
import { saveShippingAddress } from '../store/actions/cartActions';

const ShippingScreen = () => {
  const cart = useAppSelector((state: any) => state.cart);
  const { shippingAddress } = cart;

  const [address, setAddress] = useState(shippingAddress.address);
  const [city, setCity] = useState(shippingAddress.city);
  const [postalCode, setPostalCode] = useState(shippingAddress.postalCode);
  const [country, setCountry] = useState(shippingAddress.country);

  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({ address, city, postalCode, country }) as any
    );
    navigate('/payment');
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Shipping</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='address'>
          <Form.Label>Address</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter address'
            value={address}
            onChange={e => setAddress(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='city' className='mt-2'>
          <Form.Label>City</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter city'
            value={city}
            onChange={e => setCity(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='postalCode' className='mt-2'>
          <Form.Label>Postal Code</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter postal code'
            value={postalCode}
            onChange={e => setPostalCode(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group controlId='country' className='mt-2'>
          <Form.Label>Country</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter country'
            value={country}
            onChange={e => setCountry(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant='primary' type='submit' className='mt-2'>
          Continue
        </Button>
      </Form>
    </FormContainer>
  );
};

export default ShippingScreen;
