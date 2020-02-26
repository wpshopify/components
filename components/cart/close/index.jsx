import { CartContext } from '../_state/context'

const { useContext } = wp.element
const { __ } = wp.i18n

function CartClose() {
  const [cartState, cartDispatch] = useContext(CartContext)

  function onClose(e) {
    cartDispatch({ type: 'TOGGLE_CART', payload: false })
  }

  return (
    <button
      className='wps-btn-close wps-modal-close-trigger'
      title={__('Close Cart', wpshopify.misc.textdomain)}
      onClick={onClose}>
      <span className='wps-modal-close-trigger'>×</span>
    </button>
  )
}

export { CartClose }
