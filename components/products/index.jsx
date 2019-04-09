import React, { useState, useEffect } from 'react'
import { Product } from './product'
import isEmpty from 'lodash/isEmpty'

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
function Products(props) {
   console.log('ProductsProducts props', props)

   return (
      <>
         {!isEmpty(props.products) ? (
            <section className='wps-products'>
               {props.products.map(productOptions => (
                  <Product key={productOptions.componentID} options={productOptions} />
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
