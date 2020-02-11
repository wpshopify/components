import { AddressesContext } from '../_state/context'
import { AccountReturn } from '../../return'
import { Notice } from '../../../../notice'

const { useContext } = wp.element

function AddressesHeader() {
  const [addressesState] = useContext(AddressesContext)

  return (
    <header>
      <AccountReturn text='Return to Account Details' onInner={false} />
      <h2>Your Addresses</h2>

      {addressesState.notices && (
        <Notice message={addressesState.notices.message} type={addressesState.notices.type} />
      )}
    </header>
  )
}

export { AddressesHeader }
