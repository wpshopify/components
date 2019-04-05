import React, { useState, useEffect } from 'react'
import { Product } from './product'

function productsDefaultProps() {
   return {
      products: []
   }
}

/*

Props has the same shape as productsDefaultProps

*/
function Products(props) {
   console.log(':::::::::::::::: props.products[0].componentOptions.orderBy', props.products[0].componentOptions.orderby)

   return (
      <>
         {props.products ? (
            <section className='wps-products'>
               {props.products.map(productOptions => (
                  <Product key={productOptions.componentID} options={productOptions} {...props} />
               ))}
            </section>
         ) : (
            ''
         )}
      </>
   )
}

Products.defaultProps = productsDefaultProps()

export { Products }
