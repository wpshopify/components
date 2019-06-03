import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'
import { ShopContext } from '../../../../shop/_state/context'

function ProductPriceSingle({ price }) {
   const [shopState] = useContext(ShopContext)

   return <span className='wps-product-individual-price'>{shopState.isShopReady && formatPriceToCurrency(price, shopState.info.currencyCode)}</span>
}

export { ProductPriceSingle }
