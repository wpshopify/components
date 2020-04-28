import { FilterHook, __t } from '../../../../common/utils'

function CartLineItemTitle({ lineItem }) {
  return (
    <span className='wps-cart-lineitem-title-content col-9'>
      <FilterHook name='cart.lineItem.title.text'>{__t(lineItem.product.title)}</FilterHook>
    </span>
  )
}

export { CartLineItemTitle }
