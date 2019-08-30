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
      if (!customerState.customer) {
         console.log('getCustomerInfo FETCHING', customerState)

         const [errorCust, respCust] = await to(getCustomer(customerState.user.id))

         console.log('errorCust', errorCust)
         console.log('respCust', respCust)

         if (!errorCust) {
            customerDispatch({ type: 'SET_CUSTOMER', payload: respCust.data.customer })
            customerDispatch({ type: 'SET_DEFAULT_ADDRESS', payload: respCust.data.customer })
         }
      } else {
         console.log('getCustomerInfo NOT FETCHING', customerState)
      }
   }

   useEffect(() => {
      console.log('M A Y B E customerState.customer changed')

      getCustomerInfo()
      customerDispatch({ type: 'SET_INNER_PAGE', payload: false })
   }, [customerState.customer])

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

export { AccountWrapper }
