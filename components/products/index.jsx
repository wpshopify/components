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
function Products({ options, isLoading }) {
   return (
      <>
         {isEmpty(options.products) ? (
            <span className='wps-notice wps-notice-inline wps-notice-warning'>{options.noResultsText}</span>
         ) : (
            <section className={'wps-products wps-products-' + options.type} data-wps-test={isLoading}>
               {options.products.map(productOption => (
                  <Product key={uuidv4()} options={productOption} />
               ))}
            </section>
         )}
      </>
   )
}

Products.defaultProps = productsDefaultProps()

export { Products }
