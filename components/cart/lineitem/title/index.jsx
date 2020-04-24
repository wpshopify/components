import { FilterHook } from '../../../../common/utils'

const { __ } = wp.i18n

function CartLineItemTitle({ lineItem }) {
  return (
    <span className='wps-cart-lineitem-title-content col-9'>
      <FilterHook name='cart.lineItem.title.text'>
        {__(lineItem.product.title, wpshopify.misc.textdomain)}
      </FilterHook>
    </span>
  )
}

export { CartLineItemTitle }
