import React, { useContext } from 'react'
import { ShopContext } from '../../../../shop/context'
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

function ProductPrice({ range, compareAt, prices }) {
   const { shopState } = useContext(ShopContext)

   function isRegAndCompareSame() {
      if (!range && compareAt) {
         if (firstPriceCompareAt(prices) === firstRegPrice(prices)) {
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
         return firstPriceCompareAt(prices)
      } else {
         return firstRegPrice(prices)
      }
   }

   function getLastPrice() {
      if (compareAt) {
         return lastPriceCompareAt(prices)
      } else {
         return lastRegPrice(prices)
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
               data-wps-is-ready={shopState.isReady ? '1' : '0'}>
               {range ? <ProductPricingRange firstPrice={getFirstPrice()} lastPrice={getLastPrice()} isFirstAndLastSame={isFirstAndLastSame()} /> : <ProductPriceSingle price={getFirstPrice()} />}
            </h3>
         )}
      </>
   )
}

export { ProductPrice }
