import React from 'react';


function ProductAddButton({ product, isLoading }) {

   return (

      <div
         className="wps-component wps-component-products-add-button wps-btn-wrapper"
         data-wps-is-component-wrapper
         data-wps-product-id={product.id}
         data-wps-post-id=""
         data-wps-ignore-sync="1">

         <button
            type="button"
            itemProp="potentialAction"
            itemScope
            itemType="https://schema.org/BuyAction"
            href="#!"
            className="wps-btn wps-add-to-cart"
            title={product.title}
            data-wps-is-ready={isLoading ? '0' : '1'}>

            Add to cart

         </button>

      </div>

   )

}


export {
   ProductAddButton
}