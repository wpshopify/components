import { FilterHook } from '../../../../common/utils'
const { __ } = wp.i18n

function CartLineItemRemove({ onRemove }) {
  return (
    <span className='wps-cart-lineitem-remove' onClick={onRemove}>
      <FilterHook name='cart.lineItem.remove.text'>
        {__('Remove', wpshopify.misc.textdomain)}
      </FilterHook>
    </span>
  )
}

export { CartLineItemRemove }
