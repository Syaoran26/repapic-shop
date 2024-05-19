import { useMount, useQuery } from '@common/hooks';
import { useNavigate } from 'react-router-dom';
import config from '~/config';
import api from '~/config/api';

const Return = () => {
  const navigate = useNavigate();
  const query = useQuery();
  const orderCode = query.get('orderCode');
  const status = query.get('status');

  useMount(() => {
    api
      .post('/orders/payment', { orderCode, status })
      .then((res) => navigate(config.routes.cartPurchase))
      .catch((err) => navigate(config.routes.cartPurchase));
  });

  return <></>;
};

export default Return;
