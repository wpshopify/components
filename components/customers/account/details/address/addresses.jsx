import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'
import { AccountAddressControls } from './address-controls'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetailsAddresses({ addresses }) {
   const [customerState] = useContext(CustomersContext)

   return (
      addresses &&
      addresses.map(address => (
         <div key={uuidv4()}>
            <AccountDetailsAddress address={address.node} />
            <AccountAddressControls address={address.node} />
         </div>
      ))
   )
}

export { AccountDetailsAddresses }
