import { AddressForm } from './address-form'
import { AccountReturn } from '../../return'
import { stylesSlideIn } from '../../../_styles'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

function AddressFormAdd() {
  return (
    <section css={stylesSlideIn}>
      <AccountReturn path='/addresses' text='Return to Addresses' onInner={true} />

      <h2>Add New Address:</h2>

      <AddressForm type='add' />
    </section>
  )
}

export { AddressFormAdd }
