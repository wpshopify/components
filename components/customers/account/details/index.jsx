import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'

/** @jsx jsx */
import { jsx } from '@emotion/core'

function AccountDetails() {
   const [customerState] = useContext(CustomersContext)

   const stylesDetails = {
      width: '32%'
   }

   return (
      <section css={stylesDetails}>
         <h2>Account Details</h2>

         {customerState.customer && (
            <div className='wps-account-inner'>
               <h3 className='customer-name'>
                  {customerState.customer.firstName} {customerState.customer.lastName}
               </h3>
               <p className='customer-email'>{customerState.customer.email}</p>
               <p className='customer-phone'>{customerState.customer.phone}</p>
            </div>
         )}
      </section>
   )
}

export { AccountDetails }
