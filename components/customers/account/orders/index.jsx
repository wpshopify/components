import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Order } from './order'
import { CustomersContext } from '../../_state/context'
import { OrderDetails } from './details'
import uuidv4 from 'uuid/v4'

import { Table } from '../../../tables'
import { TableHeader } from '../../../tables/header'
import { Th } from '../../../tables/header/th'
import { TableBody } from '../../../tables/body'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Orders() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   const stylesOrders = {
      width: '65%'
   }

   return (
      <section css={stylesOrders}>
         <h2>Order History</h2>
         {customerState.customer && !customerState.onInnerPage && (
            <Table>
               <TableHeader>
                  <Th>Order</Th>
                  <Th>Date</Th>
                  <Th>Order Status</Th>
                  <Th>Fulfillment Status</Th>
                  <Th>Total</Th>
               </TableHeader>

               <TableBody>{customerState.customer && customerState.customer.orders.edges.map(order => <Order key={uuidv4()} order={order} />)}</TableBody>
            </Table>
         )}
         {customerState.onInnerPage && <OrderDetails />}
      </section>
   )
}

export { Orders }
