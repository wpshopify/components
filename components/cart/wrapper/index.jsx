/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartContext } from '../_state/context';
import {
  addDiscountHelper,
  useAddLineItems,
  useInstances,
  useReplaceLineItems,
  useGetProductsFromLineItems,
} from '../_common';
import { useAction, useCartToggle } from '../../../common/hooks';
import { findTotalCartQuantities } from '../../../common/cart';
import { mq, fadeIn, slideInFromTop } from '../../../common/css';
import { useAnime, slideOutCart, slideInCart } from '../../../common/animations';
import isEmpty from 'lodash/isEmpty';

import { removeLineItems } from '../_common';

import CartButtons from '../buttons';

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ '../../loader')
);

const CartContainer = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContainer-public' */ '../container')
);

function CartWrapper() {
  const { useContext, useRef, useEffect, useState, Suspense } = wp.element;
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

  const addLineItemsQuery = useAddLineItems(cartState, cartDispatch, addCheckoutLineItems);
  const instancesQuery = useInstances(cartState, cartDispatch, cartState.buildNewCheckout);

  const productsFromLineItemsQuery = useGetProductsFromLineItems(
    cartState,
    cartDispatch,
    instancesQuery
  );

  const replaceLineItemsQuery = useReplaceLineItems(cartState, cartDispatch);

  function openCart() {
    animeSlideInRight(cartElement.current);
    cartDispatch({ type: 'CART_LOADED', payload: true });
    cartDispatch({ type: 'TOGGLE_CART', payload: true });
  }

  function closeCart() {
    animeSlideOutRight(cartElement.current);
    cartDispatch({ type: 'TOGGLE_CART', payload: false });
  }

  useEffect(() => {
    if (discountCode === null) {
      return;
    }

    if (wpshopify.misc.isPro && discountCode) {
      addDiscountHelper(cartDispatch, discountCode);
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
    if (wpshopify.misc.isPro && cartState.discountCode) {
      cartDispatch({ type: 'SET_IS_UPDATING', payload: true });
      cartDispatch({ type: 'SET_IS_CALCULATING_TOTAL', payload: true });
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

    cartDispatch({
      type: 'SET_IS_ADDING_LINEITEMS',
      payload: true,
    });

    cartDispatch({ type: 'SET_IS_UPDATING', payload: true });
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
    if (setCheckoutNotes === null) {
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

  // This hook is fired also from the <AddButton> component
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
    justify-content: flex-start;
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
    background: rgba(255, 255, 255, 0.7);
    z-index: 2;
    display: flex;
    justify-content: center;
    align-items: center;
    transiton: all 0.2s ease;
  `;

  const updatingOverlayTextCSS = css`
    z-index: 9999;
    margin-top: -150px;
    font-size: 24px;
    font-weight: bold;
    transiton: all 0.2s ease;
  `;

  return (
    <div ref={cartElement} className='wps-cart' css={cartCSS}>
      {cartState.isUpdating && (
        <div css={[updatingOverlay, fadeIn]}>
          <div css={[updatingOverlayTextCSS, slideInFromTop]}>
            Updating cart <Loader color='#000' center={true} />
          </div>
        </div>
      )}
      {<CartButtons buttons={cartState.buttons} />}
      <Suspense fallback='Loading cart ...'>
        {cartState.isCartLoaded && (
          <CartContainer cartState={cartState} cartDispatch={cartDispatch} />
        )}
      </Suspense>
    </div>
  );
}

export { CartWrapper, removeLineItems };
