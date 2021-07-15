import {
  replaceLineItems,
  addDiscount,
  removeDiscount,
  getProductsFromLineItems,
  buildInstances,
  queryProductsFromIds,
  queryOptionsNoRefetch,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';

import {
  getVariantsFromProducts,
  getVariantIdFromLineItems,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';

import to from 'await-to-js';
import { useQuery } from 'react-query';
import has from 'lodash/has';
import isEmpty from 'lodash/isEmpty';

const { useState } = wp.element;

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
      ...queryOptionsNoRefetch,
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
      ...queryOptionsNoRefetch,
    }
  );
}

function useAddLineItems(cartState, cartDispatch, addCheckoutLineItems) {
  return useQuery(
    'checkout::addLineItems',
    () => {
      return queryProductsFromIds(addCheckoutLineItems.productIds);
    },
    {
      enabled: cartState.isAddingLineItems,
      onError: (error) => {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });
      },
      onSuccess: (data) => {
        const arrayOfVariantIds = getVariantIdFromLineItems(addCheckoutLineItems);
        const arrayOfVariants = getVariantsFromProducts(data, arrayOfVariantIds);

        console.log('arrayOfVariants', arrayOfVariants);

        if (arrayOfVariants) {
          wp.hooks.doAction('product.addToCart', {
            variants: arrayOfVariants,
            lineItems: addCheckoutLineItems.lineItems,
            checkoutId: cartState.checkoutId,
            lineItemOptions: {
              minQuantity: false,
              maxQuantity: false,
            },
          });
  
          wp.hooks.doAction('cart.toggle', 'open');
  
        }

        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        
      },
      ...queryOptionsNoRefetch,
    }
  );
}

function useInstances(cartState, cartDispatch) {
  const [isBuildingNewCheckout, setIsBuildingNewCheckout] = useState(false);

  function setEmptyCheckout(cartDispatch) {
    cartDispatch({
      type: 'SET_CHECKOUT_ID',
      payload: false,
    });

    cartDispatch({ type: 'IS_CART_READY', payload: true });
  }

  return useQuery(
    'checkout::instances::' + isBuildingNewCheckout,
    () => {
      return buildInstances(isBuildingNewCheckout);
    },
    {
      onError: (error) => {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });

        setEmptyCheckout(cartDispatch);
      },
      onSuccess: (data) => {
        if (!data || !data.checkout) {
          cartDispatch({
            type: 'UPDATE_NOTICES',
            payload: {
              type: 'error',
              message: wp.i18n.__('No checkout instance available', 'wpshopify'),
            },
          });

          return setEmptyCheckout(cartDispatch);
        }

        // If checkout was completed, generate a new checkout session
        if (data.checkout.completedAt) {
          setIsBuildingNewCheckout(true);
          return;
        }

        if (wpshopify.misc.isPro && data.checkout.discountApplications.length) {
          cartDispatch({
            type: 'SET_DISCOUNT_CODE',
            payload: data.checkout.discountApplications[0].code,
          });

          if (has(data.checkout.discountApplications[0].value, 'percentage')) {
            cartDispatch({
              type: 'SET_PERCENTAGE_OFF',
              payload: data.checkout.discountApplications[0].value.percentage,
            });
          }

          if (has(data.checkout.discountApplications[0].value, 'amount')) {
            cartDispatch({
              type: 'SET_AMOUNT_OFF',
              payload: data.checkout.discountApplications[0].value.amount,
            });
          }
        }

        cartDispatch({
          type: 'SET_CHECKOUT_ID',
          payload: data.checkout && data.checkout.id ? data.checkout.id : false,
        });
      },
      ...queryOptionsNoRefetch,
    }
  );
}

function useGetProductsFromLineItems(cartState, cartDispatch, instancesQuery) {
  return useQuery('checkout::getProductsFromLineItems', getProductsFromLineItems, {
    enabled: !!instancesQuery.data,
    onError: (error) => {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      });
    },
    onSuccess: (products) => {
      cartDispatch({
        type: 'SET_CHECKOUT_CACHE',
        payload: { checkoutId: instancesQuery.data.checkout.id },
      });

      cartDispatch({
        type: 'SET_LINE_ITEMS_AND_VARIANTS',
        payload: {
          lineItems: { products: products },
          checkoutId: instancesQuery.data.checkout.id,
        },
      });

      if (isEmpty(products)) {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true });
      } else {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false });
      }

      cartDispatch({ type: 'IS_CART_READY', payload: true });
    },
    ...queryOptionsNoRefetch,
  });
}

function useReplaceLineItems(cartState, cartDispatch) {
  return useQuery(
    'checkout::replaceLineItems',
    () => {
      return replaceLineItems(cartState.checkoutCache.lineItems);
    },
    {
      enabled: cartState.isCalculatingTotal,
      onError: (error) => {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: error,
          },
        });
        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({ type: 'SET_IS_CALCULATING_TOTAL', payload: false });
      },
      onSuccess: (updatedCheckout) => {
        cartDispatch({
          type: 'SET_CART_TOTAL',
          payload: updatedCheckout.subtotalPriceV2.amount,
        });
        cartDispatch({
          type: 'SET_BEFORE_DISCOUNT_TOTAL',
          payload: updatedCheckout.lineItemsSubtotalPrice.amount,
        });

        if (
          cartState.totalLineItems === 0 ||
          !updatedCheckout.discountApplications.length ||
          !updatedCheckout.discountApplications[0].applicable
        ) {
          cartDispatch({ type: 'SET_IS_REMOVING_DISCOUNT_CODE', payload: true });
          cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false });
        }

        cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
        cartDispatch({ type: 'SET_IS_CALCULATING_TOTAL', payload: false });
      },
      ...queryOptionsNoRefetch,
    }
  );
}

export {
  addDiscountCode,
  removeLineItems,
  addDiscountHelper,
  useAddDiscount,
  useRemoveDiscountCode,
  useAddLineItems,
  useInstances,
  useGetProductsFromLineItems,
  useReplaceLineItems,
};
