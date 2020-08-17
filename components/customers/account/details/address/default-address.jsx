import { CustomersContext } from '../../../_state/context'
import { AccountDetailsAddress } from './address'

const { useContext } = wp.element

function AccountDetailsDefaultAddress() {
  const [customerState] = useContext(CustomersContext)

  return customerState.defaultAddress ? (
    <AccountDetailsAddress address={customerState.defaultAddress} />
  ) : null
}

export { AccountDetailsDefaultAddress }
