import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/hooks';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import FormContainer from '../components/UI/FormContainer';
import { useAppSelector } from '../hooks/hooks';
import { listProductDetails } from '../store/actions/productActions';

const ProductEditScreen = () => {
  const navigate = useNavigate();
  const { id: productId } = useParams();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);

  const dispatch = useAppDispatch();

  const productDetails = useAppSelector((state: any) => state.productDetails);
  const { loading, error, product } = productDetails;

  useEffect(() => {
    if (!product.name || product._id !== productId) {
      dispatch(listProductDetails(productId!) as any);
    } else {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setDescription(product.description);
      setCategory(product.category);
      setCountInStock(product.countInStock);
    }
  }, [dispatch, productId, product, productId]);

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit product</h1>
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter name'
                value={name}
                onChange={e => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='price' className='mt-2'>
              <Form.Label>Price</Form.Label>
              <Form.Control
                type='number'
                placeholder='Enter price'
                value={price}
                onChange={e => setPrice(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='image' className='mt-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='image'
                placeholder='Enter image'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='brand' className='mt-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='brand'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='countInStock' className='mt-2'>
              <Form.Label>Count in stock</Form.Label>
              <Form.Control
                type='countInStock'
                placeholder='Enter count in stock'
                value={countInStock}
                onChange={e => setCountInStock(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId='category' className='mt-2'>
              <Form.Label>Category</Form.Label>
              <Form.Control
                type='category'
                placeholder='Enter category'
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
            </Form.Group>

            <Form.Group controlId='description' className='mt-2'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as='textarea'
                style={{ resize: 'none' }}
                rows={4}
                value={description}
                onChange={e => setDescription(e.target.value)}
              />
            </Form.Group>

            <Button variant='primary' type='submit' className='mt-2'>
              Update
            </Button>
          </Form>
        )}
      </FormContainer>
    </>
  );
};

export default ProductEditScreen;
