/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartContext } from '../_state/context';
import { addDiscountCode, removeDiscountCode } from '../_common';
import { useAction, useCartToggle } from '../../../common/hooks';
import { findTotalCartQuantities } from '../../../common/cart';
import { mq } from '../../../common/css';
import { useAnime, slideOutCart, slideInCart } from '../../../common/animations';
import isEmpty from 'lodash/isEmpty';
import {
  getProductsFromLineItems,
  buildInstances,
  replaceLineItems,
  queryProductsFromIds,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import { CartButtons } from '../buttons';
import to from 'await-to-js';

import { removeLineItems } from '../_common';

const CartHeader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartHeader-public' */ '../header')
);
const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents-public' */ '../contents')
);
const CartFooter = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartFooter-public' */ '../footer')
);

function CartWrapper() {
  const { useContext, useRef, useEffect, Suspense } = wp.element;
  const cartElement = useRef();
  const isFirstRender = useRef(true);
  const [cartState, cartDispatch] = useContext(CartContext);
  const updateCheckoutAttributes = useAction('update.checkout.attributes');
  const addCheckoutLineItems = useAction('add.checkout.lineItems');
  const removeCheckoutLineItems = useAction('remove.checkout.lineItems');
  const setCheckoutAttributes = useAction('set.checkout.attributes', null);
  const setCheckoutNotes = useAction('set.checkout.note', null);
  const lineItemsAdded = useAction('product.addToCart');
  const discountCode = useAction('set.checkout.discount', null);
  const animeSlideInRight = useAnime(slideInCart);
  const animeSlideOutRight = useAnime(slideOutCart);
  const isCartOpen = useCartToggle(cartElement);

  function setEmptyCheckout() {
    cartDispatch({
      type: 'SET_CHECKOUT_ID',
      payload: false,
    });

    cartDispatch({ type: 'IS_CART_READY', payload: true });
  }

  async function cartBootstrap() {
    var [error, instances] = await to(buildInstances());

    if (error) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      });

      return setEmptyCheckout();
    }

    // If no checkout was found ...
    if (!instances || !instances.checkout) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: wp.i18n.__('No checkout instance available', 'wpshopify'),
        },
      });

      return setEmptyCheckout();
    }

    // If checkout was completed ...
    if (instances.checkout.completedAt) {
      var [buildInstancesError, newInstances] = await to(buildInstances(true));

      if (buildInstancesError) {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: buildInstancesError,
          },
        });

        return setEmptyCheckout();
      }

      if (!newInstances) {
        cartDispatch({
          type: 'UPDATE_NOTICES',
          payload: {
            type: 'error',
            message: wp.i18n.__('No store checkout or client instances were found.', 'wpshopify'),
          },
        });

        return setEmptyCheckout();
      }

      // Responsible for creating the new checkout instance
      instances = newInstances;
    }

    if (wpshopify.misc.isPro && instances.checkout.discountApplications.length) {
      cartDispatch({
        type: 'SET_DISCOUNT_CODE',
        payload: instances.checkout.discountApplications[0].code,
      });
    }

    cartDispatch({
      type: 'SET_CHECKOUT_ID',
      payload: instances.checkout && instances.checkout.id ? instances.checkout.id : false,
    });

    let [productsError, products] = await to(getProductsFromLineItems());

    if (productsError) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: productsError,
        },
      });
    } else {
      cartDispatch({
        type: 'SET_CHECKOUT_CACHE',
        payload: { checkoutId: instances.checkout.id },
      });

      cartDispatch({
        type: 'SET_LINE_ITEMS_AND_VARIANTS',
        payload: {
          lineItems: { products: products },
          checkoutId: instances.checkout.id,
        },
      });

      if (isEmpty(products)) {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true });
      } else {
        cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false });
      }
    }

    cartDispatch({ type: 'IS_CART_READY', payload: true });
  }

  function openCart() {
    animeSlideInRight(cartElement.current);
    cartDispatch({ type: 'CART_LOADED', payload: true });
    cartDispatch({ type: 'TOGGLE_CART', payload: true });
  }

  function closeCart() {
    animeSlideOutRight(cartElement.current);
    cartDispatch({ type: 'TOGGLE_CART', payload: false });
  }

  async function addDiscountCodeWrapper(discountCode) {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true });

    const [error, checkout] = await to(addDiscountCode(cartState, cartDispatch, discountCode));

    cartDispatch({ type: 'SET_IS_UPDATING', payload: false });

    if (error || !checkout) {
      cartDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: error,
        },
      });

      return;
    }

    cartDispatch({
      type: 'SET_CHECKOUT_CACHE',
      payload: { checkoutId: checkout.id },
    });

    //  cartDispatch({ type: 'UPDATE_CHECKOUT_TOTAL', payload: checkout.subtotalPriceV2.amount })
    cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: discountCode });
  }

  async function updateCheckoutWhenDiscount() {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true });

    const [updatedCheckoutError, updatedCheckout] = await to(
      replaceLineItems(cartState.checkoutCache.lineItems)
    );

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
      removeDiscountCode(cartDispatch);
      cartDispatch({ type: 'SET_DISCOUNT_CODE', payload: false });
    }

    cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
  }

  async function addLineItems(lineItemsAndVariants) {
    cartDispatch({ type: 'SET_IS_UPDATING', payload: true });

    const checkoutId = cartState.checkoutId;
    const productIds = getProductIdsFromLineItems(lineItemsAndVariants);
    const arrayOfVariantIds = getVariantIdFromLineItems(lineItemsAndVariants);

    const [productsIdError, productsResp] = await to(queryProductsFromIds(productIds));

    if (productsIdError) {
      console.error('WP Shopify Error: ', productsIdError);
      return;
    }

    const arrayOfVariants = getVariantsFromProducts(productsResp, arrayOfVariantIds);

    wp.hooks.doAction('product.addToCart', {
      variants: arrayOfVariants,
      lineItems: lineItemsAndVariants.lineItems,
      checkoutId: checkoutId,
    });
    wp.hooks.doAction('cart.toggle', 'open');
    cartDispatch({ type: 'SET_IS_UPDATING', payload: false });
  }

  function decodeProductId(id) {
    var decoded = atob(id);

    var splitted = decoded.split('gid://shopify/Product/');

    return splitted[1];
  }

  function getProductIdsFromLineItems(lineItemsAndVariants) {
    return lineItemsAndVariants.productIds.map((id) => decodeProductId(id));
  }

  function getVariantIdFromLineItems(lineItemsAndVariants) {
    return lineItemsAndVariants.lineItems.reduce((acc, lineItem) => {
      acc.push(lineItem.variantId);

      return acc;
    }, []);
  }

  function getVariantsFromProducts(productsResp, arrayOfVariantIds) {
    return productsResp.model.products.map((product) => {
      var foundVariant = product.variants.filter((variant) => {
        return arrayOfVariantIds.includes(variant.id);
      });

      return foundVariant[0];
    });
  }

  useEffect(() => {
    cartBootstrap();
  }, []);

  useEffect(() => {
    if (discountCode === null) {
      return;
    }

    if (wpshopify.misc.isPro && discountCode) {
      addDiscountCodeWrapper(discountCode);
    }
  }, [discountCode]);

  useEffect(() => {
    if (!cartState.isCartReady) {
      wp.hooks.doAction('before.cart.ready', cartState);
      return;
    }

    wp.hooks.doAction('after.cart.ready', cartState);
  }, [cartState.isCartReady]);

  useEffect(() => {
    cartDispatch({
      type: 'SET_TOTAL_LINE_ITEMS',
      payload: findTotalCartQuantities(cartState.checkoutCache.lineItems),
    });
  }, [cartState.checkoutCache.lineItems]);

  useEffect(() => {
    wp.hooks.doAction('on.checkout.update', cartState);

    if (wpshopify.misc.isPro && cartState.discountCode) {
      updateCheckoutWhenDiscount();
    }
  }, [cartState.totalLineItems]);

  useEffect(() => {
    if (!updateCheckoutAttributes) {
      return;
    }

    cartDispatch({
      type: 'UPDATE_CHECKOUT_ATTRIBUTES',
      payload: updateCheckoutAttributes,
    });
  }, [updateCheckoutAttributes]);

  useEffect(() => {
    if (!addCheckoutLineItems) {
      return;
    }

    addLineItems(addCheckoutLineItems);
  }, [addCheckoutLineItems]);

  useEffect(() => {
    if (!removeCheckoutLineItems) {
      return;
    }

    removeLineItems(removeCheckoutLineItems, cartState, cartDispatch);
  }, [removeCheckoutLineItems]);

  useEffect(() => {
    if (setCheckoutAttributes === null) {
      return;
    }

    cartDispatch({
      type: 'SET_CHECKOUT_ATTRIBUTES',
      payload: setCheckoutAttributes,
    });
  }, [setCheckoutAttributes]);

  useEffect(() => {
    if (setCheckoutAttributes === null) {
      return;
    }

    wp.hooks.doAction('on.checkout.note', setCheckoutNotes);
    cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNotes });
  }, [setCheckoutNotes]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (isCartOpen) {
      openCart();
      return;
    }

    closeCart();
  }, [isCartOpen]);

  /*
  
  This hook is fired also from the <AddButton> component
  
  */
  useEffect(() => {
    if (!lineItemsAdded || isEmpty(lineItemsAdded)) {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true });
      return;
    }

    cartDispatch({
      type: 'UPDATE_LINE_ITEMS_AND_VARIANTS',
      payload: lineItemsAdded,
    });

    cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false });
  }, [lineItemsAdded]);

  const cartCSS = css`
    width: 400px;
    padding: 1em;
    position: fixed;
    height: 100%;
    right: 0;
    top: 0;
    margin-top: 0;
    background: white;
    box-shadow: -17px 0 35px rgba(0, 0, 0, 0.1);
    z-index: 99999999;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 320ms ease;
    transform: translateX(110%);
    box-sizing: border-box;

    ${mq('xsmall')} {
      width: 100%;
    }

    input[type='number']::-webkit-inner-spin-button,
    input[type='number']::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  `;

  const updatingOverlay = css`
    display: ${cartState.isUpdating ? 'block' : 'none'};
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.6);
    z-index: 2;

    .components-spinner {
      z-index: 9999;
      position: absolute;
      top: 40%;
      left: 50%;
      margin: 0;
      width: 26px;
      height: 26px;

      &:before {
        top: 4px;
        left: 4px;
        width: 7px;
        height: 7px;
        border-radius: 100%;
        transform-origin: 9px 9px;
      }
    }
  `;

  return (
    <div ref={cartElement} className='wps-cart' css={cartCSS}>
      <div css={updatingOverlay}>Loading cart ...</div>
      {<CartButtons buttons={cartState.buttons} />}

      <Suspense fallback='Loading cart ...'>
        {cartState.isCartLoaded && (
          <>
            <CartHeader cartState={cartState} cartDispatch={cartDispatch} />
            <CartContents
              isCartEmpty={cartState.isCartEmpty}
              checkoutCache={cartState.checkoutCache}
            />
            <CartFooter />
          </>
        )}
      </Suspense>
    </div>
  );
}

export { CartWrapper, removeLineItems };
