import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../_state/context'
import { ShopContext } from '../../../shop/_state/context'
import { stylesSlideIn } from '../../_styles'
import { useAnime, pulse } from '../../../../common/animations'
import find from 'lodash/find'
import uuidv4 from 'uuid/v4'
import { A } from 'hookrouter'
import { AccountDetailsDefaultAddress } from '../details/address/default-address'
import { AccountDetailsAddresses } from '../details/address/addresses'
import { AccountAddressControls } from '../details/address/address-controls'
import { AccountReturn } from '../return'
import { AddressesProvider } from './_state/provider'
import { AddressesHeader } from './header'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function withoutDefault(addresses, lookup) {
   return addresses.filter(address => address.node.address1 !== lookup)
}

function Addresses() {
   const [customerState, customersDispatch] = useContext(CustomersContext)
   const [shopState] = useContext(ShopContext)

   const stylesWrap = css`
      display: flex;
      margin-bottom: 2em;
   `

   const stylesInner = css`
      margin-right: 2em;
   `

   useEffect(() => {
      customersDispatch({ type: 'SET_SELECTED_ADDRESS', payload: false })
   }, [customerState.customer.addresses])

   return (
      <AddressesProvider>
         <section css={stylesSlideIn}>
            <AddressesHeader />

            {customerState.customer.addresses && (
               <div css={stylesWrap}>
                  <div css={stylesInner}>
                     <h3>Default Address</h3>
                     <AccountDetailsDefaultAddress />
                     <AccountAddressControls address={customerState.defaultAddress} />
                  </div>

                  <div css={stylesInner}>
                     <h3>Other Addresses</h3>

                     <AccountDetailsAddresses addresses={withoutDefault(customerState.customer.addresses.edges, customerState.defaultAddress.address1)} />
                  </div>
               </div>
            )}

            <A href={'/' + shopState.settings.customers.accountPageAccount + '/addresses/add'} className='wps-btn wps-btn-secondary wpshopify-btn-auto-width'>
               Add new address
            </A>
         </section>
      </AddressesProvider>
   )
}

export { Addresses }
