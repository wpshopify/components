import React from 'react'
import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'

function ProductPriceSingle({ price }) {
   return <span className='wps-product-individual-price'>{formatPriceToCurrency(price)}</span>
}

export { ProductPriceSingle }
