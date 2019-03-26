import React, { useContext } from 'react'
import { getPrices } from '../../../../common/pricing/data'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { ShopContext } from '../../../shop/context'
import { ProductContext } from '../context'

function ProductPricing() {
   const { shopState } = useContext(ShopContext)
   const { productState } = useContext(ProductContext)

   const newPrices = getPrices(productState.product)

   return (
      <div
         className='wps-component wps-component-products-pricing'
         data-wps-is-component-wrapper
         data-wps-post-id=''
         data-wps-is-showing-compare-at=''
         data-wps-is-showing-local=''
         data-wps-is-showing-price-range=''
         data-wps-component-order='0'>
         <h3 itemProp='offers' itemScope itemType='https://schema.org/Offer' className='wps-products-price wps-product-pricing wps-products-price-one'>
            <div className='wps-price-wrapper' data-wps-is-ready={shopState.isReady ? '1' : '0'} data-wps-is-multi-price='0' data-wps-is-price-wrapper='1'>
               {formatPriceToCurrency(newPrices[0])}
            </div>
         </h3>
      </div>
   )
}

export { ProductPricing }
