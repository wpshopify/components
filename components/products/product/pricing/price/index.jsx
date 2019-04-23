import React, { useContext } from 'react'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductPricingContext } from '../_state/context'

import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

import { ProductPricingRange } from '../range'
import { ProductPriceSingle } from '../single'

function lastPrice(prices, type) {
   if (isEmpty(prices)) {
      return 0
   }
   return last(prices[type])
}

function firstRegPrice(prices) {
   if (isEmpty(prices)) {
      return 0
   }

   return prices.regPrices[0]
}

function firstPriceCompareAt(prices) {
   if (isEmpty(prices)) {
      return 0
   }

   return prices.compareAtPrices[0]
}

function lastRegPrice(prices) {
   return lastPrice(prices, 'regPrices')
}

function lastPriceCompareAt(prices) {
   return lastPrice(prices, 'compareAtPrices')
}

function ProductPrice({ compareAt }) {
   const [shopState] = useContext(ShopContext)

   const [productPricingState] = useContext(ProductPricingContext)

   function isRegAndCompareSame() {
      if (!productPricingState.showingRange && compareAt) {
         if (firstPriceCompareAt(productPricingState.prices) === firstRegPrice(productPricingState.prices)) {
            return true
         }
      }

      return false
   }

   function isFirstAndLastSame() {
      if (getFirstPrice() === getLastPrice()) {
         return true
      }

      return false
   }

   function getFirstPrice() {
      if (compareAt) {
         return firstPriceCompareAt(productPricingState.prices)
      } else {
         return firstRegPrice(productPricingState.prices)
      }
   }

   function getLastPrice() {
      if (compareAt) {
         return lastPriceCompareAt(productPricingState.prices)
      } else {
         return lastRegPrice(productPricingState.prices)
      }
   }

   return (
      <>
         {!isRegAndCompareSame() && (
            <h3
               itemScope
               itemProp='offers'
               itemType='https://schema.org/Offer'
               className='wps-products-price wps-product-pricing wps-products-price-one'
               data-wps-is-showing-compare-at={compareAt}
               data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
               {productPricingState.showingRange ? (
                  <ProductPricingRange firstPrice={getFirstPrice()} lastPrice={getLastPrice()} isFirstAndLastSame={isFirstAndLastSame()} />
               ) : (
                  <ProductPriceSingle price={getFirstPrice()} />
               )}
            </h3>
         )}
      </>
   )
}

export { ProductPrice }
