import { useState, useEffect, ChangeEvent } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';
import { useAppDispatch } from '../hooks/hooks';
import Message from '../components/UI/Message';
import Loader from '../components/UI/Loader';
import FormContainer from '../components/UI/FormContainer';
import { useAppSelector } from '../hooks/hooks';
import {
  listProductDetails,
  updateProduct,
} from '../store/actions/productActions';
import axios from 'axios';

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
  const [uploading, setUploading] = useState(false);

  const dispatch = useAppDispatch();

  const productDetails = useAppSelector((state: any) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useAppSelector((state: any) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: 'PRODUCT_UPDATE_RESET' });
      navigate('/admin/productlist');
    } else {
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
    }
  }, [dispatch, productId, product, productId, successUpdate, navigate]);

  const uploadFileHandler = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];

    const formData = new FormData();

    formData.append('image', file);
    setUploading(true);

    try {
      const config = {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      };

      const { data } = await axios.post('/api/upload', formData, config);

      setImage(data);
      console.log(data);
      setUploading(false);
    } catch (error) {
      console.log(error);
      setUploading(false);
    }
  };

  const submitHandler = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        image,
        brand,
        description,
        category,
        countInStock,
      } as any) as any
    );
  };

  return (
    <>
      <Link to='/admin/productlist' className='btn btn-light my-3'>
        Go back
      </Link>
      <FormContainer>
        <h1>Edit product</h1>
        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
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

            <Form.Group className='mt-2'>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type='text'
                placeholder='Enter image url'
                value={image}
                onChange={e => setImage(e.target.value)}
              />
              <Form.Control
                id='image-file'
                type='file'
                onChange={uploadFileHandler}
                className='mt-2'
              />
              {uploading && <Loader />}
            </Form.Group>

            <Form.Group controlId='brand' className='mt-2'>
              <Form.Label>Brand</Form.Label>
              <Form.Control
                type='brand'
                placeholder='Enter brand'
                value={brand}
                onChange={e => setBrand(e.target.value)}
              />
              {uploading && <Loader />}
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
