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

function CustomersAccount() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   console.log('customerState', customerState)

   async function getCustomerInfo() {
      const [errorCust, respCust] = await to(getCustomer(customerState.user.id))

      console.log('errorCust', errorCust)
      console.log('respCust', respCust)

      if (!errorCust) {
         customerDispatch({ type: 'SET_CUSTOMER', customer: respCust.data.customer })
      }
   }

   useEffect(() => {
      getCustomerInfo()
   }, [])

   const styles = {
      display: 'flex',
      justifyContent: 'space-between'
   }

   return (
      <>
         {customerState.isAccountPage && (
            <div css={styles}>
               <Orders />
               <AccountDetails />
            </div>
         )}
      </>
   )
}

export { CustomersAccount }
