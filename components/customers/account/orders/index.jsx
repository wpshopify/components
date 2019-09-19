import React, { useState, useContext, useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Order } from './order'
import { CustomersContext } from '../../_state/context'
import { OrderDetails } from './details'
import uuidv4 from 'uuid/v4'
import ContentLoader, { BulletList } from 'react-content-loader'
import isEmpty from 'lodash/isEmpty'

import { Table } from '../../../tables'
import { TableHeader } from '../../../tables/header'
import { Th } from '../../../tables/header/th'
import { TableBody } from '../../../tables/body'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function Orders() {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   const [hasEmptyOrders, setHasEmptyOrder] = useState(false)

   const stylesOrders = {
      width: '65%'
   }

   function hasOrders() {
      if (isEmpty(customerState.customer) || isEmpty(customerState.customer.orders) || isEmpty(customerState.customer.orders.edges)) {
         return false
      }

      return true
   }

   useEffect(() => {
      if (!hasOrders()) {
         setHasEmptyOrder(true)
      }
   }, [])

   return (
      <section css={stylesOrders}>
         <h2>Order History</h2>
         {customerState.isReady && !customerState.onInnerPage ? (
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
         ) : hasEmptyOrders ? (
            'No orders!'
         ) : (
            <ContentLoader height={160} width={1000} speed={2} primaryColor='#efedf0' secondaryColor='#f7f6f8'>
               <circle cx='10' cy='20' r='8' />
               <circle cx='10' cy='45' r='8' />
               <circle cx='10' cy='72' r='8' />
               <rect x='28' y='14' rx='0' ry='0' width='826' height='12' />
               <rect x='343' y='11' rx='0' ry='0' width='0' height='0' />
               <rect x='28' y='39' rx='0' ry='0' width='826' height='12' />
               <rect x='145' y='37' rx='0' ry='0' width='0' height='5' />
               <rect x='128' y='40' rx='0' ry='0' width='0' height='9' />
               <rect x='28' y='66' rx='0' ry='0' width='826' height='12' />
            </ContentLoader>
         )}
         {customerState.onInnerPage && <OrderDetails />}
      </section>
   )
}

export { Orders }
