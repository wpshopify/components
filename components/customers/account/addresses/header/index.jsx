import { AddressesContext } from '../_state/context'
import { AccountReturn } from '../../return'

const { Notice } = wp.components
const { useContext } = wp.element

function AddressesHeader() {
  const [addressesState] = useContext(AddressesContext)

  return (
    <header>
      <AccountReturn text='Return to Account Details' onInner={false} />
      <h2>Your Addresses</h2>

      {addressesState.notices && (
        <Notice status={addressesState.notices.type} isDismissible={false}>
          {addressesState.notices.message}
        </Notice>
      )}
    </header>
  )
}

export { AddressesHeader }
