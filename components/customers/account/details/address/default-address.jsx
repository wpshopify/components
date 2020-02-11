import { CustomersContext } from '../../../_state/context'
import { AccountDetailsAddress } from './address'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function AccountDetailsDefaultAddress() {
  const [customerState] = useContext(CustomersContext)

  return (
    <>
      {customerState.defaultAddress && (
        <AccountDetailsAddress address={customerState.defaultAddress} />
      )}
    </>
  )
}

export { AccountDetailsDefaultAddress }
