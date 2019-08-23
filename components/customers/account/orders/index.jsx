import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Order } from './order'
import { CustomersContext } from '../../_state/context'
import uuidv4 from 'uuid/v4'
/** @jsx jsx */
import { jsx } from '@emotion/core'

function Orders() {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   console.log('customerState', customerState)

   const stylesOrders = {
      width: '65%'
   }

   const stylesTable = {
      width: '100%',
      border: '1px solid #e7e7e7',
      borderCollapse: 'collapse',
      borderSpacing: 0
   }

   const stylesthtd = {
      textAlign: 'left',
      padding: '15px',
      border: '1px solid #e7e7e7'
   }

   return (
      <section css={stylesOrders}>
         <h2>Order History</h2>

         {customerState.customer && (
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
      </section>
   )
}

export { Orders }
