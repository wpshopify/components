import React, { useState, useEffect } from 'react'
import { Product } from './product'

function productsDefaultProps() {
   return {
      products: [],
      excludes: [],
      includes: []
   }
}

/*

Props has the same shape as productsDefaultProps

*/
function Products(props) {
   console.log('props.options!!!!!', props)

   return (
      <>
         {props.products ? (
            <section className='wps-products'>
               {props.products.map(product => (
                  <Product key={product.id} product={product} {...props} />
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
