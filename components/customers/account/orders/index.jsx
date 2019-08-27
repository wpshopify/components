import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Order } from './order'
import { CustomersContext } from '../../_state/context'
import { OrderDetails } from './details'
import uuidv4 from 'uuid/v4'
/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'

function Orders() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   const slide = keyframes`
      0% {
         transform: translateX(90px);
         opacity: 0;
      }

      100% {
         transform: translateX(0);
         opacity: 1;
      }`

   const stylesOrders = {
      width: '65%'
   }

   const stylesTable = {
      width: '100%',
      border: '1px solid #e7e7e7',
      borderCollapse: 'collapse',
      borderSpacing: 0,
      opacity: 1,
      animation: slide + ' 0.3s ease'
   }

   const stylesthtd = {
      textAlign: 'left',
      padding: '15px',
      border: '1px solid #e7e7e7'
   }

   return (
      <section css={stylesOrders}>
         <h2>Order History</h2>
         {customerState.customer && !customerState.onInnerPage && (
            <table css={stylesTable}>
               <thead>
                  <tr>
                     <th css={stylesthtd}>Order</th>
                     <th css={stylesthtd}>Date</th>
                     <th css={stylesthtd}>Order Status</th>
                     <th css={stylesthtd}>Fulfillment Status</th>
                     <th css={stylesthtd}>Total</th>
                  </tr>
               </thead>
               <tbody>{customerState.customer && customerState.customer.orders.edges.map(order => <Order key={uuidv4()} order={order} />)}</tbody>
            </table>
         )}
         {customerState.onInnerPage && <OrderDetails />}
      </section>
   )
}

export { Orders }
