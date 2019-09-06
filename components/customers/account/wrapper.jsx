import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { getCustomer } from '@wpshopify/api'
import to from 'await-to-js'

/** @jsx jsx */
import { jsx, css, keyframes } from '@emotion/core'
import { CustomersContext } from '../_state/context'
import { Orders } from './orders'
import { AccountDetails } from './details'

function findDefaultAddress(addressLookup, addresses) {
   var found = find(addresses.edges, function(o) {
      return o.node.address1 === addressLookup
   })

   if (found) {
      return found.node
   }

   return false
}

function AccountWrapper() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   var styles = {
      display: 'flex',
      justifyContent: 'space-between',
      width: '100%'
   }

   async function getCustomerInfo() {
      if (customerState.customer) {
         return
      }

      const [errorCust, respCust] = await to(getCustomer(customerState.user.id))

      if (!errorCust) {
         customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer })
         customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: respCust.data.customer })
      }

      // customerDispatch({ type: 'SET_INNER_PAGE', payload: false })
   }

   useEffect(() => {
      getCustomerInfo()
   }, [customerState.customer])

   return (
      customerState.isAccountPage && (
         <div css={styles}>
            <Orders />
            <AccountDetails />
         </div>
      )
   )
}

export { AccountWrapper }
