import React, { useContext } from 'react';
import Product from '../products';


function Items({ data }) {

   return (
      <section className="wps-products-container">
         {
            data.map(item => (
               <Product key={item.id} product={item} ></Product>
            ))
         }
      </section>
   )

}

export {
   Items
}
