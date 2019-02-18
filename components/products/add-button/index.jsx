import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import { ProductContext } from '../index';

function ProductAddButton() {

  const product = useContext(ProductContext);

  return (

    <div
      className="wps-component wps-component-products-add-button wps-btn-wrapper"
      data-wps-is-component-wrapper
      data-wps-product-id={product.id}
      data-wps-post-id=""
      data-wps-is-lite-sync="1">

      <button
        type="button"
        itemProp="potentialAction"
        itemScope
        itemType="https://schema.org/BuyAction"
        href="#!"
        className="wps-btn wps-add-to-cart"
        title={product.title}
        data-wps-is-ready="1">

        Add to cart

      </button>

    </div>

  )

}

export default ProductAddButton;
