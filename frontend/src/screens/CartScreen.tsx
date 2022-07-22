import { useLocation, useParams, useSearchParams } from 'react-router-dom';

const CartScreen = () => {
  const { id } = useParams();
  const { search } = useLocation();
  const [searchParams] = useSearchParams();

  return <div>CartScreen</div>;
};

export default CartScreen;
