import update from 'immutability-helper';
import some from 'lodash/some';
import concat from 'lodash/concat';
import uniqWith from 'lodash/uniqWith';
import isEqual from 'lodash/isEqual';
import isEmpty from 'lodash/isEmpty';
import flattenDepth from 'lodash/flattenDepth';
import reduce from 'lodash/reduce';
import filter from 'lodash/filter';
import find from 'lodash/find';

import {
  getCheckoutCache,
  setCheckoutCache,
  mergeCheckoutCacheVariants,
  mergeCheckoutCacheLineItems,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import { calcCheckoutTotal } from '../../../common/products';
import { updateNoticesState } from '../../../common/state';

function productVariantExistsInCheckoutCache(checkoutCacheVariants, variant) {
  return some(checkoutCacheVariants, { id: variant.id });
}

function onlyVariantsInCheckoutCache(checkoutCacheVariants, variants) {
  return variants.filter((variant) =>
    productVariantExistsInCheckoutCache(checkoutCacheVariants, variant)
  );
}

/*

Responsible for: adding product info to the variant information

*/
function addProductInfoToVariants(productsFromShopify, checkoutCache) {
  if (!productsFromShopify) {
    return [];
  }

  return productsFromShopify.map((product) => {
    if (product) {
      var variants = flattenDepth(
        onlyVariantsInCheckoutCache(checkoutCache.variants, product.variants),
        1
      );

      return {
        product: product,
        variants: variants,
      };
    }
  });
}

/*

Responsible for: only finding variants within the checkout

*/
function onlyVariantsInCheckout(allVariantsAndProducts) {
  return allVariantsAndProducts.map((variantsAndProducts) => {
    if (variantsAndProducts) {
      return {
        variants: variantsAndProducts.variants.map((variant) => {
          variant.product = {};
          variant.product.title = variantsAndProducts.product.title;
          variant.product.id = variantsAndProducts.product.id;
          return variant;
        }),
      };
    }
  });
}

/*

Responsible for: combining all variants

*/
function combineAllVariants(variants) {
  return reduce(
    variants,
    function (result, value, key) {
      if (value) return result.concat(value.variants);
    },
    []
  );
}

/*

Responsible for: finding variants from product ids

*/
function findVariantsFromProductIds(productsFromShopify, checkoutCache) {
  var productInfoAndVariants = addProductInfoToVariants(productsFromShopify, checkoutCache);

  var variantsMulti = onlyVariantsInCheckout(productInfoAndVariants);
  var variantsCombined = combineAllVariants(variantsMulti);

  return variantsCombined;
}

/*

Responsible for: Only returning "available" line items. E.g., if Shop owner 
removes a variant, this keeps our cache up to date

*/
function findLineItemsFromProducts(productsFromShopify, checkoutCache) {
  return checkoutCache.lineItems.filter((lineItem) => {
    return find(productsFromShopify, function (product) {
      if (product) {
        return find(product.variants, { id: lineItem.variantId });
      }
    });
  });
}

/*

Responsible for: checking whether the cart is empty or not

*/
function hasCartEmpty(lineItems) {
  return lineItems.length === 0;
}

/*

Responsible for: updating the ShopState "lineItems"

*/
function updateLineItemQuantity(state, payload) {
  state.lineItems = state.lineItems.map((lineItem) => {
    if (lineItem.variantId === payload.variantId) {
      lineItem.quantity = payload.lineItemNewQuantity;
    }

    return lineItem;
  });

  return state;
}

/*

Responsible for: updating the checkout cache

lineItems: What we pass to the Shopify API during checkout 
variants: What we use to display the correct data within the cart 

*/
function updateLineItemsAndVariants(checkoutCache, payload) {
  return {
    lineItems: mergeCheckoutCacheLineItems(checkoutCache.lineItems, payload.lineItems),
    variants: mergeCheckoutCacheVariants(checkoutCache.variants, payload.variants),
  };
}

/*

Responsible for: setting line items and variants

// payload.products comes from the Shopify request on each page load

*/
function setLineItemsAndVariants(checkoutCache, payload) {
  return {
    lineItems: findLineItemsFromProducts(payload.products, checkoutCache),
    variants: findVariantsFromProductIds(payload.products, checkoutCache),
  };
}

/*

Responsible for: removing line items and variants

*/
function removeLineItemsAndVariants(checkoutCache, payload) {
  checkoutCache.lineItems = filter(checkoutCache.lineItems, (o) => o.variantId !== payload);
  checkoutCache.variants = filter(checkoutCache.variants, (o) => o.id !== payload);

  return checkoutCache;
}

function CartReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_CART': {
      return {
        ...state,
        isCartOpen: update(state.isCartOpen, { $set: action.payload }),
      };
    }
    case 'CART_LOADED': {
      if (state.isCartLoaded) {
        return state;
      }

      return {
        ...state,
        isCartLoaded: update(state.isCartLoaded, { $set: action.payload }),
      };
    }
    case 'SET_IS_CHECKING_OUT': {
      return {
        ...state,
        isCheckingOut: update(state.isCheckingOut, { $set: action.payload }),
      };
    }
    case 'SET_TERMS_ACCEPTED': {
      return {
        ...state,
        termsAccepted: update(state.termsAccepted, { $set: action.payload }),
      };
    }
    case 'UPDATE_NOTICES': {
      return {
        ...state,
        notices: updateNoticesState(state.notices, action.payload),
      };
    }
    case 'SET_IS_CART_EMPTY': {
      return {
        ...state,
        isCartEmpty: update(state.isCartEmpty, { $set: action.payload }),
      };
    }

    case 'IS_CART_INTERACTIVE': {
      return {
        ...state,
        isCartInteractive: update(state.isCartEmpty, { $set: action.payload }),
      };
    }

    case 'SET_CART_TOTAL': {
      return {
        ...state,
        total: update(state.total, { $set: action.payload }),
      };
    }

    case 'SET_BEFORE_DISCOUNT_TOTAL': {
      return {
        ...state,
        beforeDiscountTotal: update(state.beforeDiscountTotal, { $set: action.payload }),
      };
    }

    case 'SET_CHECKOUT_CACHE': {
      const checkoutCache = getCheckoutCache(action.payload.checkoutId);

      // If the store doesn't exist, set it to our intial state from the reducer
      if (checkoutCache) {
        return {
          ...state,
          checkoutCache: checkoutCache,
        };
      }

      let newCheckoutCache = update(state.checkoutCache, {
        $set: state.checkoutCache,
      });

      setCheckoutCache(action.payload.checkoutId, newCheckoutCache);

      return {
        ...state,
        checkoutCache: newCheckoutCache,
        total: update(state.total, {
          $set: calcCheckoutTotal(newCheckoutCache),
        }),
      };
    }

    case 'UPDATE_LINE_ITEMS_AND_VARIANTS': {
      const checkoutCacheUpdated = update(state.checkoutCache, {
        $apply: (checkoutCache) => updateLineItemsAndVariants(checkoutCache, action.payload),
      });

      setCheckoutCache(action.payload.checkoutId, checkoutCacheUpdated);

      return {
        ...state,
        checkoutCache: checkoutCacheUpdated,
        total: update(state.total, {
          $set: calcCheckoutTotal(checkoutCacheUpdated),
        }),
      };
    }

    case 'SET_LINE_ITEMS_AND_VARIANTS': {
      const newCheckoutCache = update(state.checkoutCache, {
        $apply: (checkoutCache) => setLineItemsAndVariants(checkoutCache, action.payload.lineItems),
      });

      // action.payload.products comes from an API call during bootstrap
      setCheckoutCache(action.payload.checkoutId, newCheckoutCache);

      return {
        ...state,
        checkoutCache: newCheckoutCache,
        total: update(state.total, {
          $set: calcCheckoutTotal(newCheckoutCache),
        }),
      };
    }

    case 'REMOVE_LINE_ITEM': {
      const newCheckoutCache = update(state.checkoutCache, {
        $apply: (checkoutCache) =>
          removeLineItemsAndVariants(checkoutCache, action.payload.lineItem),
      });

      setCheckoutCache(action.payload.checkoutId);

      return {
        ...state,
        checkoutCache: newCheckoutCache,
        total: update(state.total, {
          $set: calcCheckoutTotal(newCheckoutCache),
        }),
      };
    }

    case 'UPDATE_LINE_ITEM_QUANTITY': {
      const checkoutCacheUpdated = update(state.checkoutCache, {
        $apply: (stateObj) => updateLineItemQuantity(stateObj, action.payload.lineItem),
      });

      setCheckoutCache(action.payload.checkoutId, checkoutCacheUpdated);

      if (state.discountCode) {
        var newTotal = state.total;
      } else {
        var newTotal = update(state.total, {
          $set: calcCheckoutTotal(checkoutCacheUpdated),
        });
      }

      return {
        ...state,
        isCartEmpty: hasCartEmpty(checkoutCacheUpdated.lineItems),
        total: newTotal,
        checkoutCache: checkoutCacheUpdated,
      };
    }

    case 'UPDATE_CHECKOUT_TOTAL': {
      const checkoutCache = getCheckoutCache(action.payload.checkoutId);

      return {
        ...state,
        total: update(state.total, { $set: calcCheckoutTotal(checkoutCache) }),
      };
    }

    case 'SET_TOTAL_LINE_ITEMS': {
      return {
        ...state,
        totalLineItems: update(state.totalLineItems, { $set: action.payload }),
      };
    }

    case 'SET_SHOP_INFO': {
      return {
        ...state,
        shopInfo: update(state.shopInfo, { $set: action.payload }),
      };
    }

    case 'SET_IS_UPDATING': {
      return {
        ...state,
        isUpdating: update(state.isUpdating, { $set: action.payload }),
      };
    }

    case 'SET_DISCOUNT_CODE': {
      return {
        ...state,
        discountCode: update(state.discountCode, { $set: action.payload }),
      };
    }

    case 'UPDATE_CHECKOUT_ATTRIBUTES': {
      let attributes = uniqWith(concat(state.customAttributes, [action.payload]), isEqual);

      return {
        ...state,
        customAttributes: update(state.customAttributes, { $set: attributes }),
      };
    }

    case 'SET_CHECKOUT_ATTRIBUTES': {
      if (isEmpty(action.payload)) {
        var newCheckoutAttributes = [];
      } else {
        var newCheckoutAttributes = [action.payload];
      }

      return {
        ...state,
        customAttributes: update(state.customAttributes, {
          $set: newCheckoutAttributes,
        }),
      };
    }

    case 'SET_CHECKOUT_NOTE': {
      return {
        ...state,
        note: update(state.note, { $set: action.payload }),
      };
    }

    case 'IS_CART_READY': {
      return {
        ...state,
        isCartReady: update(state.isCartReady, {
          $set: true,
        }),
      };
    }

    case 'SET_CHECKOUT_ID': {
      return {
        ...state,
        checkoutId: update(state.checkoutId, { $set: action.payload }),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in CartReducer`);
    }
  }
}

export { CartReducer };
