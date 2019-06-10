import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShopContext } from '../../../../shop/_state/context'
import { ProductPricingContext } from '../_state/context'
import { ProductContext } from '../../_state/context'

import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

import { ProductPricingRange } from '../range'
import { ProductPriceSingle } from '../single'
import { useAction } from '../../../../../common/hooks'
import { useAnime, pulse } from '../../../../../common/animations'

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
   const [productState] = useContext(ProductContext)
   const [productPricingState] = useContext(ProductPricingContext)
   const isFirstRender = useRef(true)
   const singlePriceElement = useRef()
   const [regPrice, setRegPrice] = useState(getFirstPrice())
   const isShowing = useAction('show.product.pricing', true)
   const animePulse = useAnime(pulse)

   function isRegAndCompareSame() {
      if (!productPricingState.showPriceRange && compareAt) {
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

   useEffect(() => {
      if (isFirstRender.current) {
         isFirstRender.current = false
         return
      }

      if (productState.selectedVariant) {
         setRegPrice(productState.selectedVariant.price)
         animePulse(singlePriceElement.current)

      }
   }, [productState.selectedVariant])

   return (
      <>
         {!isRegAndCompareSame() &&
            (isShowing && (
               <h3
                  itemScope
                  itemProp='offers'
                  itemType='https://schema.org/Offer'
                  className='wps-products-price wps-product-pricing wps-products-price-one'
                  data-wps-is-showing-compare-at={compareAt}
                  data-wps-is-ready={shopState.isShopReady ? '1' : '0'}>
                  {productPricingState.showPriceRange && !productState.selectedVariant ? (
                     <ProductPricingRange firstPrice={getFirstPrice()} lastPrice={getLastPrice()} isFirstAndLastSame={isFirstAndLastSame()} />
                  ) : (
                     <ProductPriceSingle ref={singlePriceElement} price={regPrice} />
                  )}
               </h3>
            ))}
      </>
   )
}

export { ProductPrice }
