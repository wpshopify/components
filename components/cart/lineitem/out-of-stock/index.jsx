import { FilterHook, __t } from '../../../../common/utils'

const { Notice } = wp.components

function CartLineItemOutOfStock() {
  return (
    <Notice status='warning' isDismissible={false}>
      <FilterHook name='notice.unavailable.text'>{__t('Out of stock')}</FilterHook>
    </Notice>
  )
}

export { CartLineItemOutOfStock }
