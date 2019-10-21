import { hasHooks, _t } from '../../../common/utils'

function CartInitialState(options) {
   return {
      isUpdating: false,
      isCheckingOut: false,
      isCartOpen: false,
      termsAccepted: true,
      isCartEmpty: true,
      isCartInteractive: false,
      buttons: options,
      notices: [],
      checkoutCache: {
         lineItems: [],
         variants: [],
         total: 0.0
      },
      totalLineItems: 0,
      customAttributes: [],
      note: false,
      title: hasHooks() ? wp.hooks.applyFilters('default.cart.title', _t('Shopping cart')) : _t('Shopping cart'),
      checkoutText: hasHooks() ? wp.hooks.applyFilters('default.cart.checkout.text', _t('Begin checkout')) : _t('Begin checkout')
   }
}

export { CartInitialState }
