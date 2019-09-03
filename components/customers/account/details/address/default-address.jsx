import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'
import { AccountAddressControls } from './address-controls'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetailsDefaultAddress() {
   const [customerState] = useContext(CustomersContext)

   return <>{customerState.defaultAddress && <AccountDetailsAddress address={customerState.defaultAddress} />}</>
}

export { AccountDetailsDefaultAddress }
