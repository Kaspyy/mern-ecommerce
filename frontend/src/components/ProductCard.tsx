import { Card } from 'react-bootstrap';
import { Product } from '../types';
import Rating from './Rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <a href={`/product/${product._id}`}>
        <Card.Img key={product._id} variant='top' src={product.image} />
      </a>
      <Card.Body>
        <a href={`/product/${product._id}`}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </a>
        <Card.Text>
          <Rating
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
        <Card.Text as='h3'>
          <div className='my-3'>
            <strong>${product.price}</strong>
          </div>
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
