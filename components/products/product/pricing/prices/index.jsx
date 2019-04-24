import React, { useContext, useEffect } from 'react'
import { getPrices } from '../../../../../common/pricing/data'
import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ProductPrice } from '../price'

function ProductPrices() {
   const [productPricingState, productPricingDispatch] = useContext(ProductPricingContext)
   const [productState] = useContext(ProductContext)

   useEffect(() => {
      console.log('productState.payload')

      if (productPricingState.showingRange) {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload, 'asc') })
      } else {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload) })
      }
   }, [productState.payload])

   return productPricingState.showingCompareAt ? (
      <>
         <ProductPrice compareAt={true} />
         <ProductPrice compareAt={false} />
      </>
   ) : (
      <ProductPrice compareAt={productPricingState.showingCompareAt} prices={productPricingState.prices} />
   )
}

export { ProductPrices }
