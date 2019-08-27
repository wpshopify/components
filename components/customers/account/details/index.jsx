import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { stylesSlideIn } from '../../_styles'
import { useAnime, pulse } from '../../../../common/animations'
import find from 'lodash/find'
import uuidv4 from 'uuid/v4'
import { A } from 'hookrouter'
import { AccountDetailsDefaultAddress } from './address/default-address'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetails() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   const stylesDetails = css`
      width: 32%;
   `

   const stylesName = css`
      font-size: 1em;
      font-weight: normal;
   `

   const stylesAddressLine = css`
      && {
         margin: 0;
      }
   `

   const stylesViewAddresses = css`
      && {
         margin-top: 1em;
         display: block;
      }
   `

   function onClick() {
      customerDispatch({ type: 'SET_INNER_PAGE', payload: true })
   }

   return (
      <section css={[stylesDetails, stylesSlideIn]}>
         <h2>Account Details</h2>

         {customerState.customer && (
            <div className='wps-account-inner'>
               <h3 className='customer-name' css={stylesName}>
                  {customerState.customer.firstName} {customerState.customer.lastName}
               </h3>

               <p className='customer-email'>{customerState.customer.email}</p>

               <AccountDetailsDefaultAddress />

               <A href='/account/addresses' onClick={onClick} className='wps-view-addresses' css={stylesViewAddresses}>
                  View all addresses
               </A>
            </div>
         )}
      </section>
   )
}

export { AccountDetails }
