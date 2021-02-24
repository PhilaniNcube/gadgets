import { useQuery } from '@apollo/client';
import gql from 'graphql-tag';
import Head from 'next/head';
import Image from 'next/image';
import ErrorMessage from '../../components/ErrorMessage';
import OrderStyles from '../../components/styles/OrderStyles';
import formatMoney from '../../lib/formatMoney';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order: Order(where: { id: $id }) {
      id
      charge
      total
      user {
        id
      }
      items {
        id
        name
        description
        price
        quantity
        photo {
          image {
            publicUrlTransformed
          }
        }
      }
    }
  }
`;

export default function SingleOrderPage({ query }) {
  const { data, error, loading } = useQuery(SINGLE_ORDER_QUERY, {
    variables: {
      id: query.id,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <ErrorMessage error={error} />;

  const { order } = data;

  return (
    <OrderStyles>
      <Head>
        <title>Cape Gadgets - Order - {order.id}</title>
      </Head>
      <p>
        <span>Order Id: </span>
        <span>{order.id}</span>
      </p>

      <p>
        <span>Charge: </span>
        <span>{order.charge}</span>
      </p>
      <p>
        <span>Order Total: </span>
        <span>{formatMoney(order.total)}</span>
      </p>
      <p>
        <span>Item Count: </span>
        <span>{order.items.length}</span>
      </p>
      <div className="items">
        {order.items.map((item, index) => (
          <div key={item.id} className="order-item">
            <Image
              src={item.photo.image.publicUrlTransformed}
              height={500}
              width={500}
              alt={item.name}
            />
            <div className="item-details">
              <h2>{item.name}</h2>
              <p>Qty: {item.quantity}</p>
              <p>Each: {formatMoney(item.price)}</p>
              <p>Subtotal: {formatMoney(item.price * item.quantity)}</p>
              <p>{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </OrderStyles>
  );
}
