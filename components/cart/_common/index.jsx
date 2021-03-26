import {
  replaceLineItems,
  addDiscount,
  removeDiscount,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import to from 'await-to-js';

async function removeDiscountCode(cartDispatch) {
  cartDispatch({ type: 'SET_IS_UPDATING', payload: true });

  var [err, resp] = await to(removeDiscount());

  if (err) {
    cartDispatch({
      type: 'UPDATE_NOTICES',
      payload: {
        type: 'error',
        message: err,
      },
    });
  }

  cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false });
  cartDispatch({ type: 'SET_IS_UPDATING', payload: false });

  cartDispatch({
    type: 'SET_CART_TOTAL',
    payload: resp.subtotalPriceV2.amount,
  });
}

function addDiscountCode(cartState, cartDispatch, discountVal) {
  return new Promise(async (resolve, reject) => {
    const [updatedCheckoutError, updatedCheckout] = await to(
      replaceLineItems(cartState.checkoutCache.lineItems)
    );

    if (updatedCheckoutError) {
      return reject('Uh oh, it looks like an error occurred. Please reload and try again.');
    }

    var [error, checkout] = await to(addDiscount(discountVal));

    if (error) {
      return reject('Uh oh, it looks like an error occurred. Please reload and try again.');
    }

    if (checkout.discountApplications.length && checkout.discountApplications[0].applicable) {
      cartDispatch({
        type: 'SET_CHECKOUT_CACHE',
        payload: { checkoutId: checkout.id },
      });

      cartDispatch({
        type: 'SET_CART_TOTAL',
        payload: checkout.subtotalPriceV2.amount,
      });

      cartDispatch({
        type: 'SET_BEFORE_DISCOUNT_TOTAL',
        payload: checkout.lineItemsSubtotalPrice.amount,
      });

      cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: discountVal });
    } else {
      return reject('No discount found or expired');
    }

    return resolve(checkout);
  });
}

function removeLineItems(lineItemIds, cartState, cartDispatch) {
  if (!lineItemIds || lineItemIds.length <= 0) {
    return;
  }

  lineItemIds.forEach((lineItemId) => {
    cartDispatch({
      type: 'REMOVE_LINE_ITEM',
      payload: {
        lineItem: lineItemId,
        checkoutId: cartState.checkoutId,
      },
    });

    cartDispatch({
      type: 'UPDATE_LINE_ITEM_QUANTITY',
      payload: {
        lineItem: {
          variantId: lineItemId,
          lineItemNewQuantity: 0,
        },
        checkoutId: cartState.checkoutId,
      },
    });
  });
}

export { removeDiscountCode, addDiscountCode, removeLineItems };
