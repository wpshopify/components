import React, { useState, useEffect, useContext } from 'react'
import ReactDOM from 'react-dom'
import { AddressForm } from './address-form'
import { AccountDetailsAddress } from './address'
import { AccountReturn } from '../../return'
import { CustomersContext } from '../../../_state/context'
import { stylesSlideIn } from '../../../_styles'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressFormAdd() {
   const [customerState, customerDispatch] = useContext(CustomersContext)

   return (
      <section css={stylesSlideIn}>
         <AccountReturn path='/account/addresses' text='Return to Addresses' onInner={true} />

         <h2>Add New Address:</h2>

         <AddressForm type='add' />
      </section>
   )
}

export { AddressFormAdd }
