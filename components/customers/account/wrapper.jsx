import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { getCustomer } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
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

   console.log('found', found)

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
      console.log('getCustomerInfo 1')
      if (customerState.customer) {
         return
      }

      console.log('getCustomerInfo 2')
      console.log('getCustomerInfo FETCHING', customerState)

      const [errorCust, respCust] = await to(getCustomer(customerState.user.id))
      console.log('getCustomerInfo 3')
      console.log('errorCust', errorCust)
      console.log('respCust', respCust)

      if (!errorCust) {
         console.log('getCustomerInfo 4')
         customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer })
         console.log('getCustomerInfo 5')
         customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: respCust.data.customer })
         console.log('getCustomerInfo 6')
      }

      // customerDispatch({ type: 'SET_INNER_PAGE', payload: false })
   }

   useEffect(() => {
      console.log('M A Y B E customerState.customer changed')

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
