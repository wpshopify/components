import React, { useContext, useEffect } from 'react'
import { getPrices } from '../../../../../common/pricing/data'
import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ProductPrice } from '../price'

function ProductPrices() {
   const [productPricingState, productPricingDispatch] = useContext(ProductPricingContext)
   const [productState] = useContext(ProductContext)

   console.log('productState', productState)
   console.log('productPricingState', productPricingState)

   useEffect(() => {
      if (productPricingState.showPriceRange) {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload, 'asc') })
      } else {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload) })
      }
   }, [productState.payload])

   return productPricingState.showCompareAt ? (
      <>
         <ProductPrice compareAt={true} />
         <ProductPrice compareAt={false} />
      </>
   ) : (
      <ProductPrice compareAt={productPricingState.showCompareAt} prices={productPricingState.prices} />
   )
}

export { ProductPrices }
