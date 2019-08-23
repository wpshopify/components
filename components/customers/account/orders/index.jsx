import React, { useContext } from 'react'
import ReactDOM from 'react-dom'
import { Order } from './order'
import { CustomersContext } from '../../_state/context'
import uuidv4 from 'uuid/v4'

function Orders() {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   console.log('customerState', customerState)

   const styles = {
      width: '66%'
   }

   return (
      <div css={styles}>
         <h2>Order History</h2>
         {customerState.payload && customerState.payload.orders.edges.map(order => <Order key={uuidv4()} order={order} />)}
      </div>
   )
}

export { Orders }
