import { __t } from '../../../common/utils'

function CartClose({ cartDispatch }) {
  function onClose(e) {
    cartDispatch({ type: 'TOGGLE_CART', payload: false })
  }

  return (
    <button
      className='wps-btn-close wps-modal-close-trigger'
      title={__t('Close Cart')}
      onClick={onClose}>
      <span className='wps-modal-close-trigger'>×</span>
    </button>
  )
}

export { CartClose }
