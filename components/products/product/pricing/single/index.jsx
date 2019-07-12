import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'
import { ShopContext } from '../../../../shop/_state/context'

const ProductPriceSingle = React.forwardRef((props, ref) => {
   const [shopState] = useContext(ShopContext)

   return (
      props.price && (
         <span ref={ref} className='wps-product-individual-price'>
            {shopState.isShopReady && formatPriceToCurrency(props.price, shopState.info.currencyCode)}
         </span>
      )
   )
})

export { ProductPriceSingle }
