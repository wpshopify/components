import React, { useState, useEffect } from 'react'
import { Product } from './product'
import sortBy from 'lodash/sortBy'

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
   // console.log(':::::::::::::::: BEFORE SORT', props.products)

   // var sortedProducts = sortItems(props.products, 'title')

   // console.log(':::::::::::::::: AFTER SORT', sortedProducts)

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
