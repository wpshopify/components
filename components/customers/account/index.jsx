import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { getCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

/** @jsx jsx */
import { jsx } from '@emotion/core'
import { usePortal } from '../../../common/hooks'
import { CustomersContext } from '../_state/context'
import { Orders } from './orders'
import { AccountDetails } from './details'

function CustomerName({ customer }) {
   console.log('customer', customer)

   return (
      <h2 className='customer-name'>
         {customer.firstName} {customer.lastName}
      </h2>
   )
}

function CustomerEmail({ customer }) {
   return <p className='customer-email'>{customer.email}</p>
}

function CustomerPhone({ customer }) {
   return <p className='customer-phone'>{customer.phone}</p>
}

function CustomersAccount() {
   const [customerState, customerDispatch] = useContext(CustomersContext)
   const [customer, setCustomer] = useState(false)

   async function getCustomerInfo() {
      const [errorCust, respCust] = await to(getCustomer(customerState.user.id))

      console.log('errorCust', errorCust)
      console.log('respCust', respCust)

      if (!errorCust) {
         customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer })
      }
   }

   useEffect(() => {
      getCustomerInfo()
   }, [])

   const styles = {
      display: 'flex'
   }

   return (
      <>
         <div css={styles}>
            <Orders />
            <AccountDetails />
         </div>
         {/* <CustomerName customer={customer} />
         <CustomerEmail customer={customer} />
         <CustomerPhone customer={customer} /> */}
      </>
   )
}

export { CustomersAccount }
