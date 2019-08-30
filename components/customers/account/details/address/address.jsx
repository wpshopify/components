import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import uuidv4 from 'uuid/v4'
import { CustomersContext } from '../../../_state/context'
import { AccountAddressControls } from './address-controls'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetailsAddress({ address }) {
   const [customerState] = useContext(CustomersContext)
   const [editingAddress, setEditingAddress] = useState(false)

   const stylesAddressLine = css`
      && {
         margin: 0;
      }
   `

   const stylesAddress = css`
      margin-bottom: 1.4em;
      border-bottom: 1px solid #ddd;
      padding-bottom: 1.4em;

      &:last-of-type {
         border-bottom: 0;
         padding-bottom: 0;
      }
   `

   return (
      <div className='wps-account-address' css={stylesAddress}>
         {address.name}
         {address &&
            address.formatted.map(line => (
               <p css={stylesAddressLine} key={uuidv4()}>
                  {line}
               </p>
            ))}

         {customerState.onInnerPage && <AccountAddressControls address={address} />}
      </div>
   )
}

export { AccountDetailsAddress }
