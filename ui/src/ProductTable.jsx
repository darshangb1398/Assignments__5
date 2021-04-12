/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';
import {
  Link, withRouter,
} from 'react-router-dom';

const ProductRow = withRouter(({ product, deleteProduct, index }) => (
  <tr>
    <td>{product.product_name}</td>
    <td>
      $
      {product.product_price}
    </td>
    <td>{product.product_category}</td>
    <td><Link to={`/image/${product.id}`}>View</Link></td>
    <td><Link to={`/edit/${product.id}`}>Edit</Link></td>
    <td><button type="button" onClick={() => { deleteProduct(index); }}>Delete</button></td>
  </tr>
));

export default function ProductTable({ products, deleteProduct }) {
  // eslint-disable-next-line max-len
  const productRows = products.map(product => <ProductRow key={product.id} product={product} deleteProduct={deleteProduct} index={product.id} />);

  return (
    <div>
      <table className="bordered-table">
        <thead>
          <th>Product Name</th>
          <th>Price</th>
          <th>Category</th>
          <th>Image</th>
          <th>Edit</th>
          <th>Delete</th>
        </thead>
        <tbody>
          {productRows}
        </tbody>
      </table>
    </div>
  );
}
