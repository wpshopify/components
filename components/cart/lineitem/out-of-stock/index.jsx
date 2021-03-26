import { FilterHook } from '../../../../common/utils';
import { Notice } from '../../../notices';

function CartLineItemOutOfStock() {
  return (
    <Notice status='warning' isDismissible={false}>
      <FilterHook name='notice.unavailable.text'>
        {wp.i18n.__('Out of stock', 'wpshopify')}
      </FilterHook>
    </Notice>
  );
}

export { CartLineItemOutOfStock };
