import { FilterHook } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';

function CartFooterSubtotalLabel() {
  return (
    <p className='wps-total-prefix'>
      <FilterHook name='cart.subtotal.text'>{wp.i18n.__('Subtotal:', 'wpshopify')}</FilterHook>
    </p>
  );
}

export default CartFooterSubtotalLabel;
