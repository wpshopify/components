import { FilterHook } from '../../../../common/utils'

const { Notice } = wp.components
const { __ } = wp.i18n

function CartLineItemOutOfStock() {
  return (
    <Notice status='warning' isDismissible={false}>
      <FilterHook name='notice.unavailable.text'>
        {__('Out of stock', wpshopify.misc.textdomain)}
      </FilterHook>
    </Notice>
  )
}

export { CartLineItemOutOfStock }
