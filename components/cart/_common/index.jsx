import {
  replaceLineItems,
  addDiscount,
  removeDiscount,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';

import to from 'await-to-js';
import { useQuery } from 'react-query';
import has from 'lodash/has';

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

      if (has(checkout.discountApplications[0].value, 'percentage')) {
        cartDispatch({
          type: 'SET_PERCENTAGE_OFF',
          payload: checkout.discountApplications[0].value.percentage,
        });
      }

      if (has(checkout.discountApplications[0].value, 'amount')) {
        cartDispatch({
          type: 'SET_AMOUNT_OFF',
          payload: checkout.discountApplications[0].value.amount,
        });
      }

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

function addDiscountHelper(cartDispatch, discount) {
  cartDispatch({
    type: 'UPDATE_NOTICES',
    payload: [],
  });

  if (!discount) {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: false });

    cartDispatch({
      type: 'UPDATE_NOTICES',
      payload: {
        type: 'warning',
        message: 'No discount found! Please enter one below.',
      },
    });
    return;
  }

  cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: discount });
  cartDispatch({ type: 'SET_IS_ADDING_DISCOUNT_CODE', payload: true });
  cartDispatch({ type: 'SET_IS_UPDATING', payload: true });
}

function useAddDiscount(cartState, cartDispatch) {
  return useQuery(
    'cart::addDiscount',
    () => {
      return addDiscountCode(cartState, cartDispatch, cartState.discountCode);
    },
    {
      enabled: cartState.isAddingDiscountCode,
      onError: (error) => {
        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({ type: 'SET_IS_ADDING_DISCOUNT_CODE', payload: false });

        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'warning',
            message: error,
          },
        });

        cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false });
      },
      onSuccess: (data) => {
        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({ type: 'SET_IS_ADDING_DISCOUNT_CODE', payload: false });
      },
    }
  );
}

function useRemoveDiscountCode(cartState, cartDispatch) {
  return useQuery(
    'cart::removeDiscount',
    () => {
      return removeDiscount();
    },
    {
      enabled: cartState.isRemovingDiscountCode,
      onError: (error) => {
        cartDispatch({ type: 'SET_IS_REMOVING_DISCOUNT_CODE', payload: false });
        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });
      },
      onSuccess: (data) => {
        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({ type: 'SET_IS_REMOVING_DISCOUNT_CODE', payload: false });
        cartDispatch({ type: 'SET_AMOUNT_OFF', payload: false });
        cartDispatch({ type: 'SET_PERCENTAGE_OFF', payload: false });

        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'success',
            message: 'Successfully removed discount.',
          },
        });

        cartDispatch({
          type: 'SET_CART_TOTAL',
          payload: data.subtotalPriceV2.amount,
        });

        cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false });
      },
    }
  );
}
export {
  addDiscountCode,
  removeLineItems,
  addDiscountHelper,
  useAddDiscount,
  useRemoveDiscountCode,
};
