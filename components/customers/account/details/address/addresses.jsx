import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { CustomersContext } from '../../../_state/context'
import uuidv4 from 'uuid/v4'
import { AccountDetailsAddress } from './address'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AccountDetailsAddresses({ addresses }) {
   const [customerState] = useContext(CustomersContext)

   return <>{addresses && addresses.map(address => <AccountDetailsAddress key={uuidv4()} address={address.node}></AccountDetailsAddress>)}</>
}

export { AccountDetailsAddresses }
