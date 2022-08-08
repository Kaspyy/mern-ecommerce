import { Link } from 'react-router-dom';
import { Card } from 'react-bootstrap';
import { Product } from '../../types/types';
import Rating from './Rating';

const ProductCard = ({ product }: { product: Product }) => {
  return (
    <Card className='my-3 p-3 rounded'>
      <Link to={`/product/${product._id}`}>
        <Card.Img key={product._id} variant='top' src={product.image} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product._id}`} style={{ textDecoration: 'none' }}>
          <Card.Title>
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>
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
