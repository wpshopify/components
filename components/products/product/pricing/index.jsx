import React, { useContext } from 'react'
import { ProductContext } from '../_state/context'
import { ProductsContext } from '../../_state/context'
import { ProductPrices } from './prices'
import { ProductPricingProvider } from './_state/provider'
import { usePortal } from '../../../../common/hooks'

function ProductPricing() {
   const [productState] = useContext(ProductContext)
   const [productsState] = useContext(ProductsContext)

   return usePortal(
      <>
         <ProductPricingProvider productsState={productsState} productState={productState}>
            <ProductPrices />
         </ProductPricingProvider>
      </>,
      productState.element
   )
}

export { ProductPricing }
