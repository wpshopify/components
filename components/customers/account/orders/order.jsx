import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { prettyDate } from '../../../../common/utils'
import { ShopContext } from '../../../shop/_state/context'
import { CustomersContext } from '../../_state/context'
import isEmpty from 'lodash/isEmpty'
import { OrderDetails } from './details'
import { A } from 'hookrouter'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Order({ order }) {
   const [shopState] = useContext(ShopContext)
   const [customersState, customerDispatch] = useContext(CustomersContext)

   const stylesthtd = {
      textAlign: 'left',
      padding: '15px',
      border: '1px solid #e7e7e7'
   }

   const stylesOrderLink = {
      textDecoration: 'underline',
      color: '#3ba9fc',
      ':hover': {
         cursor: 'pointer'
      }
   }

   const sfsdfsd = css`
      padding: 1em;
      width: 100%;
      display: block;
   `

   const tableTdLink = css`
      padding: 0;
   `

   function onClick() {
      customerDispatch({ type: 'SET_INNER_PAGE', payload: true })
      customerDispatch({ type: 'SET_SELECTED_ORDER_DETAILS', payload: order.node })
   }

   return (
      <tr>
         <td css={[stylesthtd, tableTdLink]}>
            <A href='/account/order' onClick={onClick} css={sfsdfsd}>
               {order.node.name}
            </A>
         </td>
         <td css={stylesthtd}>{prettyDate(order.node.processedAt, 'MMMM dd, yyyy')}</td>
         <td css={[stylesthtd, tableTdLink]}>
            <a href={order.node.statusUrl} target='_blank' css={sfsdfsd}>
               Check status
            </a>
         </td>
         <td css={stylesthtd}>{isEmpty(order.node.successfulFulfillments) ? 'Unfulfilled' : 'Fulfilled'}</td>
         <td css={stylesthtd}>{formatPriceToCurrency(order.node.totalPriceV2.amount, shopState.info.currencyCode)}</td>
      </tr>
   )
}

export { Order }
