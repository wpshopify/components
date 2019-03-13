import React, { useState, useEffect } from 'react';
import { Product } from './product';

function Products({ products }) {

   return (
      <section className="wps-products">
         {products.products.map(product => <Product key={product.id} isLoading={false} product={product}></Product>)}
      </section>
   )

}

export {
   Products
}
