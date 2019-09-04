import React, { useContext } from 'react'
import { AddressForm } from './address-form'
import { AccountReturn } from '../../return'
// import { CustomersContext } from '../../../_state/context'
import { stylesSlideIn } from '../../../_styles'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressFormAdd() {
   // const [customerState, customerDispatch] = useContext(CustomersContext)

   return (
      <section css={stylesSlideIn}>
         <AccountReturn path='/addresses' text='Return to Addresses' onInner={true} />

         <h2>Add New Address:</h2>

         <AddressForm type='add' />
      </section>
   )
}

export { AddressFormAdd }
