import { buildCheckout } from '/Users/andrew/www/devil/devilbox/data/www/wpshopify-api';


function CartInitialState(props = false) {

   return {
      title: 'Shopping cart',
      cartButtonDropzone: props.cartButtonDropzone,
      checkout: buildCheckout()
   }

}

export {
   CartInitialState
}