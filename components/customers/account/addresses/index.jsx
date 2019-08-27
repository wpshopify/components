import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { stylesSlideIn } from '../../_styles'
import { useAnime, pulse } from '../../../../common/animations'
import find from 'lodash/find'
import uuidv4 from 'uuid/v4'
import { A } from 'hookrouter'
import { AccountDetailsDefaultAddress } from '../details/address/default-address'
import { AccountDetailsAddresses } from '../details/address/addresses'
import { AccountReturn } from '../return'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function withoutDefault(addresses, lookup) {
   return addresses.filter(address => address.node.address1 !== lookup)
}

function Addresses() {
   const [customerState, customersDispatch] = useContext(CustomersContext)

   const stylesWrap = css`
      display: flex;
   `

   const stylesInner = css`
      margin-right: 2em;
   `

   useEffect(() => {
      customersDispatch({ type: 'SET_SELECTED_ADDRESS', payload: false })
   }, [])

   return (
      <section css={stylesSlideIn}>
         <AccountReturn path='/account/' text='Return to Account Details' onInner={false} />

         <h2>Your Addresses</h2>

         {customerState.customer.addresses && (
            <div css={stylesWrap}>
               <div css={stylesInner}>
                  <h3>Default Address</h3>
                  <AccountDetailsDefaultAddress />
               </div>

               <div css={stylesInner}>
                  <h3>Other Addresses</h3>

                  <AccountDetailsAddresses addresses={withoutDefault(customerState.customer.addresses.edges, customerState.defaultAddress.address1)} />
               </div>
            </div>
         )}
      </section>
   )
}

export { Addresses }
