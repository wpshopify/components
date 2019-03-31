import React, { useContext, useEffect, useState } from 'react'
import { getPrices } from '../../../../common/pricing/data'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../context'
import { usePortal } from '../../../../common/hooks'

function ProductPricing() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)

   const [price, setPrice] = useState()

   useEffect(() => {
      console.log('price', price)
      console.log('<ProductPricing /> showing_compare_at state: ', productState.pricing.showing_compare_at)
      console.log('<ProductPricing /> state : ', productState)
      const thePrices = getPrices(productState.product)

      console.log('thePrices', thePrices)

      if (productState.pricing.showing_compare_at === 1) {
         setPrice(thePrices[0].compareAtPrice)
      } else {
         setPrice(thePrices[0].price)
      }
   }, [])

   return usePortal(
      <h3 itemScope itemProp='offers' itemType='https://schema.org/Offer' className='wps-products-price wps-product-pricing wps-products-price-one'>
         <div className='wps-price-wrapper' data-wps-is-ready={shopState.isReady ? '1' : '0'} data-wps-is-multi-price='0' data-wps-is-price-wrapper='1'>
            {formatPriceToCurrency(price)}
         </div>
      </h3>,
      productState
   )
}

export { ProductPricing }
