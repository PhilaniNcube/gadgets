/* eslint-disable react/prop-types */
import UpdateProduct from '../components/UpdateProduct';

const UpdatePage = ({ query }) => (
  <div>
    {console.log(query)}
    <UpdateProduct id={query.id} />
  </div>
);

export default UpdatePage;
