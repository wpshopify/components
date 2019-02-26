import React, { useContext } from 'react';
import Product from '../products';
import size from 'lodash/size';

function Items({ items }) {

   function hasItems(items) {
      return size(items) !== 0 ? true : false;
   }

   return (
      <section className="wps-products-container">
         {
            !hasItems(items)
               ? <p>No results found</p>
               : items.map(item => (
                  <Product key={item.id} product={item} ></Product>
               ))
         }
      </section>
   )

}

export {
   Items
}
