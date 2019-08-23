import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { ShopContext } from '../../../shop/_state/context'
import isEmpty from 'lodash/isEmpty'

/** @jsx jsx */
import { jsx } from '@emotion/core'

function Order({ order }) {
   console.log('order.node', order.node)

   const [shopState] = useContext(ShopContext)

   var options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
   var datestring = new Date(order.node.processedAt)

   const stylesthtd = {
      textAlign: 'left',
      padding: '15px',
      border: '1px solid #e7e7e7'
   }

   return (
      <tr>
         <td css={stylesthtd}>
            <a href=''>{order.node.name}</a>
         </td>
         <td css={stylesthtd}>{datestring.toLocaleDateString('en-US', options)}</td>
         <td css={stylesthtd}>
            <a href={order.node.statusUrl} target='_blank'>
               Check status
            </a>
         </td>
         <td css={stylesthtd}>{isEmpty(order.node.successfulFulfillments) ? 'Unfulfilled' : 'Fulfilled'}</td>
         <td css={stylesthtd}>{formatPriceToCurrency(order.node.totalPriceV2.amount, shopState.info.currencyCode)}</td>
      </tr>
   )
}

export { Order }
