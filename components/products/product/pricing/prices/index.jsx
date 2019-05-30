import React, { useContext, useEffect } from 'react'
import { getPrices } from '../../../../../common/pricing/data'
import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ProductPrice } from '../price'

function ProductPrices() {
   const [productPricingState, productPricingDispatch] = useContext(ProductPricingContext)
   const [productState] = useContext(ProductContext)

   useEffect(() => {
      if (productPricingState.showPriceRange) {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload, 'asc') })
      } else {
         productPricingDispatch({ type: 'SET_PRICES', payload: getPrices(productState.payload) })
      }
   }, [productState.payload])

   return productPricingState.showCompareAt && !productState.selectedVariant ? (
      <>
         <ProductPrice compareAt={true} />
         <ProductPrice compareAt={false} />
      </>
   ) : (
      <ProductPrice compareAt={productState.selectedVariant ? false : productPricingState.showCompareAt} prices={productPricingState.prices} />
   )
}

export { ProductPrices }
