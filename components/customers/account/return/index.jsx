import { CustomersContext } from '../../_state/context'
import { A } from 'hookrouter'

const { useContext } = wp.element

function AccountReturn({ path = '', text, onInner }) {
  const [customersState, customersDispatch] = useContext(CustomersContext)

  function onClick() {
    customersDispatch({ type: 'SET_INNER_PAGE', payload: onInner })
  }

  return (
    <A href={'/' + wpshopify.settings.general.accountPageAccount + path} onClick={onClick}>
      {text}
    </A>
  )
}

export { AccountReturn }
