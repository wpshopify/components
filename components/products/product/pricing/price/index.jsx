import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'
import { ShopContext } from '../../../../shop/context'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

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
   console.log('prices..............', prices)

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
      <h3
         itemScope
         itemProp='offers'
         itemType='https://schema.org/Offer'
         className='wps-products-price wps-product-pricing wps-products-price-one'
         data-wps-is-showing-compare-at={compareAt}
         data-wps-is-ready={shopState.isReady ? '1' : '0'}>
         {range ? (
            <>
               <small className='wps-product-from-price'>From:</small>{' '}
               <span itemProp='price' className='wps-product-individual-price'>
                  {formatPriceToCurrency(getFirstPrice())}
               </span>{' '}
               <span className='wps-product-from-price-separator'>-</span> <span className='wps-product-individual-price'>{formatPriceToCurrency(getLastPrice())}</span>
            </>
         ) : (
            formatPriceToCurrency(getFirstPrice())
         )}
      </h3>
   )
}

export { ProductPrice }
