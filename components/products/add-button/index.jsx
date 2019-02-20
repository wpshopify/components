import React, { useContext } from 'react';

function ProductAddButton({ product }) {

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
