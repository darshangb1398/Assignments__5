/* eslint-disable linebreak-style */
/* eslint linebreak-style: ["error","windows"] */
/* eslint "react/react-in-jsx-scope": "off" */
/* eslint "react/jsx-no-undef": "off" */
/* eslint "no-alert": "off" */
import React from 'react';

import ProductTable from './ProductTable.jsx';
import ProductAdd from './ProductAdd.jsx';

export default class ProductList extends React.Component {
  constructor() {
    super();
    this.state = { products: [] };
    this.createProduct = this.createProduct.bind(this);
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount() {
    this.loadData();
  }

  async loadData() {
    const query = `query {
        productList {
        id product_category product_name product_price product_image
        }
    }`;

    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query }),
    }).then((response) => {
      response.json().then((result) => {
        this.setState({ products: result.data.productList });
      });
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  async createProduct(product) {
    const newProduct = product;

    const query = `mutation productAdd($newProduct: ProductInputs!) {
        productAdd(product: $newProduct) {
            _id
        }
    }`;
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables: { newProduct } }),
    }).then(() => {
      this.loadData();
    }).catch((err) => {
      alert(`Error in sending data to server: ${err.message}`);
    });
  }

  async deleteProduct(id) {
    const query = `mutation productDelete($id: Int!) {
      productDelete(id: $id)
    }`;
    // // const { products } = this.state;
    // // const { location: { pathname, search }, history } = this.props;
    // // const { id } = issues[index];
    const variables = { id };
    await fetch(window.ENV.UI_API_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, variables }),
    });
    alert('Product deleted product successfully!');
    this.loadData();
  }

  render() {
    const { state } = this;
    return (
      <div title="Inner Div">
        <h1 className="headerClass"> My Company Inventory </h1>
        <h2 className="headerClass"> Showing all available products </h2>
        <hr />
        <ProductTable products={state.products} deleteProduct={this.deleteProduct} />
        <h2>Add a new product to the inventory</h2>
        <hr />
        <ProductAdd createProduct={this.createProduct} />
      </div>
    );
  }
}
