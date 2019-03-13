import React, { useContext } from 'react';
import { ShopContext } from '../../shop/context';

function CartLineItem({ lineItem }) {
   console.log('lineItem ', lineItem);

   return (
      <div className="wps-cart-lineitem row">


         <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-img-link" target="_blank">
            <div className="wps-cart-lineitem-img" style={{ backgroundImage: `url(${lineItem.variant.image.src})` }}></div>
         </a>



         <div className="wps-cart-lineitem-content">

            <div className="wps-cart-lineitem-content-row">
               <div className="wps-cart-lineitem-variant-title">{lineItem.variant.title}</div>
               <a href="https://demo.wpshop.io/products/aerodynamic-aluminum-bench/" className="wps-cart-lineitem-title">{lineItem.title}</a>
            </div>

            <div className="wps-cart-lineitem-content-row">
               <div className="wps-cart-lineitem-quantity-container">

                  <button className="wps-btn--seamless wps-quantity-decrement" type="button" data-variant-id="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yMjIyMTc0NzE5MTg1Ng==" data-product-id="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIyMTY4MjU3MTY3ODQ=">
                     <span>-</span>
                     <span className="wps-visuallyhidden"></span>
                  </button>

                  <input className="wps-cart-lineitem-quantity" type="number" min="0" aria-label="Quantity" data-wps-previous-amount="1" value="1" />

                  <button className="btn--seamless wps-quantity-increment" type="button" data-variant-id="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0VmFyaWFudC8yMjIyMTc0NzE5MTg1Ng==" data-product-id="Z2lkOi8vc2hvcGlmeS9Qcm9kdWN0LzIyMTY4MjU3MTY3ODQ=">
                     <span>+</span>
                     <span className="wps-visuallyhidden"></span>
                  </button>

                  <span className="wps-cart-lineitem-price"><span className="wps-cart-lineitem-quantity">x{lineItem.quantity}</span>{lineItem.variant.price}</span>

               </div>

            </div>

         </div>
      </div>

   )

}

export {
   CartLineItem
}