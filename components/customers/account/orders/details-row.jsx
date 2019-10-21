import React, { useContext } from 'react'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { ShopContext } from '../../../shop/_state/context'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Td } from '../../../tables/body/td'

function OrderDetailsRow({ lineItem }) {
   const [shopState] = useContext(ShopContext)

   const sdfasdf = css`
      display: flex;
   `
   const asdasd = css`
      padding-left: 1em;
   `

   return (
      <tr>
         <Td>
            <div css={sdfasdf}>
               <img
                  src={addCustomSizingToImageUrl({
                     src: lineItem.variant.image.originalSrc,
                     width: 100,
                     height: 100,
                     crop: 'center'
                  })}
                  alt={lineItem.variant.image.altText}
                  className='lazyload'
               />
               <p css={asdasd}>{lineItem.title + '-' + lineItem.variant.title}</p>
            </div>
         </Td>
         <Td>{lineItem.variant.sku}</Td>
         <Td align='right'>{formatPriceToCurrency(lineItem.variant.priceV2.amount, shopState.info.currencyCode)}</Td>
         <Td align='right'>{lineItem.quantity}</Td>
         <Td align='right'>{formatPriceToCurrency(lineItem.variant.priceV2.amount, shopState.info.currencyCode)}</Td>
      </tr>
   )
}

export { OrderDetailsRow }
