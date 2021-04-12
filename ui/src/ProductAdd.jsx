/* eslint "react/prefer-stateless-function": "off" */
import React from 'react';

export default class ProductAdd extends React.Component {
  constructor() {
    super();
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    const form = document.forms.productAddForm;
    const price = form.productPrice.value;
    const product = {
      product_name: form.productName.value,
      product_price: parseFloat(price.substring(1, price.length)),
      product_category: form.productCategory.value,
      product_image: form.productImage.value,
    };
    const { props } = this;
    props.createProduct(product);
    form.productName.value = '';
    form.productPrice.value = '$';
    form.productImage.value = '';
  }

  render() {
    return (
      <div>
        <form name="productAddForm" onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="column">
              <h4 className="addFormTitle">Product Category</h4>
              <select name="productCategory">
                <option>Shirts</option>
                <option>Jeans</option>
                <option>Jackets</option>
                <option>Sweaters</option>
                <option>Accessories</option>
              </select>

              <h4 className="addFormTitle">Product Name</h4>
              <input type="text" name="productName" placeholder="Product Name" />
            </div>
            <div className="column">
              <h4 className="addFormTitle">Product Price</h4>
              <input defaultValue="$" type="text" name="productPrice" />

              <h4 className="addFormTitle">Image URL</h4>
              <input type="text" name="productImage" placeholder="Product Image" />
            </div>
          </div>

          <br />
          <button type="submit">Add Product</button>
        </form>
      </div>
    );
  }
}
