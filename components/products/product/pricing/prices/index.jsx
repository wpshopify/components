import React, { useContext } from 'react'
import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'
import { ProductPrice } from '../price'

function ProductPrices() {
   const [productPricingState, productPricingDispatch] = useContext(ProductPricingContext)
   const [productState] = useContext(ProductContext)

   return productPricingState.showCompareAt && !productState.selectedVariant ? (
      <>
         <ProductPrice compareAt={true} prices={productPricingState.prices} />
         <ProductPrice compareAt={false} prices={productPricingState.prices} />
      </>
   ) : (
      <ProductPrice compareAt={productState.selectedVariant ? false : productPricingState.showCompareAt} prices={productPricingState.prices} />
   )
}

export { ProductPrices }
