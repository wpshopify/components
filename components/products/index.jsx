import React, { useState, useEffect } from 'react'
import { Product } from './product'
import isEmpty from 'lodash/isEmpty'
import uuidv4 from 'uuid/v4'

function productsDefaultProps() {
   return {
      products: []
   }
}

// function sortItems(items, sortType) {
//    return sortBy(items, function(item) {
//       return item.product[sortType]
//    })
// }

/*

Props has the same shape as productsDefaultProps

*/
function Products({ options }) {
   return (
      <>
         {!isEmpty(options.products) ? (
            <section className='wps-products'>
               {options.products.map(productOption => (
                  <Product key={uuidv4()} options={productOption} />
               ))}
            </section>
         ) : (
            'No products found'
         )}
      </>
   )
}

Products.defaultProps = productsDefaultProps()

export { Products }
