import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { formatPriceToCurrency } from '../../../../common/pricing/formatting'
import { prettyDate } from '../../../../common/utils'
import { CustomersContext } from '../../_state/context'
import { AccountReturn } from '../return'
import isEmpty from 'lodash/isEmpty'
import { A } from 'hookrouter'
import { stylesSlideIn } from '../../_styles'
import { OrderDetailsRow } from './details-row'
import uuidv4 from 'uuid/v4'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function OrderDetails() {
   const [customersState, customersDispatch] = useContext(CustomersContext)
   console.log('customersState.selectedOrderDetails', customersState.selectedOrderDetails)

   return (
      <section css={stylesSlideIn}>
         <AccountReturn path='/account/' text='Return to Account Details' onInner={false} />

         <h2>Order {customersState.selectedOrderDetails.name}</h2>
         <p>{prettyDate(customersState.selectedOrderDetails.processedAt, "MMMM dd, yyyy 'at' h:mm aaaa")}</p>

         <table>
            <thead>
               <tr>
                  <th>Product</th>
                  <th>SKU</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
               </tr>
            </thead>
            <tbody>
               {customersState.selectedOrderDetails.lineItems.edges.map(lineItem => (
                  <OrderDetailsRow key={uuidv4()} lineItem={lineItem.node} />
               ))}
            </tbody>
            <tfoot>
               <tr>
                  <th>Subtotal</th>
                  <td>$781.55</td>
               </tr>
               <tr>
                  <th>
                     <strong>Total</strong>
                  </th>
                  <td>
                     <strong>$781.55 USD</strong>
                  </td>
               </tr>
            </tfoot>
         </table>
      </section>
   )
}

export { OrderDetails }
