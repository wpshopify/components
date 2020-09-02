/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ProductBuyButtonLeftInStock from '../left-in-stock';
import { Loader } from '../../../../loader';
import { useAnime, pulse, fadeInBottomSlow } from '../../../../../common/animations';
import { FilterHook } from '../../../../../common/utils';
import { buttonCSS } from '../../../../../common/css';
import { Link } from '../../../../link';

import { checkoutRedirect } from '../../../../cart/checkout';

import {
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
  getCache,
  buildClient,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api';
import to from 'await-to-js';

const { Notice } = wp.components;
const { useRef, useEffect, useState } = wp.element;

function findSingleVariantFromPayload(payload) {
  return payload.variants[0];
}

function buildAddToCartParams(lineItems, variants) {
  var checkoutId = getCache('wps-last-checkout-id');

  return {
    checkoutId: checkoutId,
    lineItems: lineItems,
    variants: variants,
  };
}

function buildLineItemParams(variant, quantity) {
  return [
    {
      variantId: variant.id,
      quantity: quantity,
    },
  ];
}

function AddButtonWrapper({
  hasLink,
  payload,
  children,
  linkTo,
  linkTarget,
  isDirectCheckout,
  linkWithBuyButton,
}) {
  return hasLink && !isDirectCheckout && !linkWithBuyButton ? (
    <Link type='products' payload={payload} linkTo={linkTo} target={linkTarget}>
      {children}
    </Link>
  ) : (
    children
  );
}

function AddButton({
  addToCartButtonColor,
  addToCartButtonTextColor,
  hasLink,
  linkWithBuyButton,
  isDirectCheckout,
  productDispatch,
  hasManyVariants,
  loader,
  buttonText,
  addedToCart,
  allOptionsSelected,
  quantity,
  selectedOptions,
  payload,
  font,
  fontWeight,
}) {
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasNotice, setHasNotice] = useState(false);
  const animePulse = useAnime(pulse);
  const button = useRef();

  useEffect(() => {
    if (allOptionsSelected) {
      animePulse(button.current);
    }
  }, [allOptionsSelected]);

  const addToCartCSS = css`
    font-family: ${font ? font : 'inherit'};
    font-weight: ${fontWeight ? fontWeight : 'inherit'};

    && {
      background-color: ${addToCartButtonColor};
    }
  `;

  async function handleClick(e) {
    if (hasLink && !isDirectCheckout && !linkWithBuyButton) {
      return;
    }

    e.preventDefault();

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!allOptionsSelected && hasManyVariants) {
      productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true });
      return;
    }

    if (hasManyVariants) {
      var variant = findVariantFromSelectedOptions(payload, selectedOptions);
    } else {
      var variant = findSingleVariantFromPayload(payload);
    }

    if (!variant) {
      // TODO: Handle this better
      console.error('WP Shopify error: handleClick variant undefined ');

      productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true });
      productDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false });
      productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
      return;
    }

    const lineItems = buildLineItemParams(variant, quantity);

    if (isDirectCheckout) {
      const client = buildClient();

      setIsCheckingOut(true);

      const [err, checkout] = await to(createUniqueCheckout(client));

      if (err) {
        setIsCheckingOut(false);
        productDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        });
        productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });

        setHasNotice({
          type: 'error',
          message: err,
        });

        return;
      }

      const [error, respNewCheckout] = await to(addLineItemsAPI(client, checkout, lineItems));

      if (error) {
        setIsCheckingOut(false);
        productDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        });
        productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });

        setHasNotice({
          type: 'error',
          message: error,
        });
        return;
      }

      productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });

      checkoutRedirect(respNewCheckout, productDispatch);
    } else {
      let addToCartParams = buildAddToCartParams(lineItems, [variant]);

      productDispatch({
        type: 'SET_ALL_SELECTED_OPTIONS',
        payload: false,
      });

      productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
      productDispatch({ type: 'SET_ADDED_VARIANT', payload: variant });
      productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false });
      productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });

      wp.hooks.doAction('cart.toggle', 'open');
      wp.hooks.doAction('product.addToCart', addToCartParams);
      wp.hooks.doAction('after.product.addToCart', lineItems, variant);
    }
  }

  return (
    <>
      <button
        ref={button}
        type='button'
        itemProp='potentialAction'
        itemScope
        itemType='https://schema.org/BuyAction'
        className='wps-btn wps-btn-secondary wps-add-to-cart'
        data-wps-is-direct-checkout={isDirectCheckout ? '1' : '0'}
        onClick={handleClick}
        css={[buttonCSS, addToCartCSS]}
        disabled={isCheckingOut}>
        {isCheckingOut ? (
          loader
        ) : (
          <AddButtonText
            addedToCart={addedToCart}
            buttonText={buttonText}
            addToCartButtonTextColor={addToCartButtonTextColor}
          />
        )}
      </button>

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false}>
          <FilterHook name='notice.product.addToCart.text'>{hasNotice.message}</FilterHook>
        </Notice>
      )}
    </>
  );
}

function AddButtonText({ buttonText, addedToCart, addToCartButtonTextColor }) {
  const [originalText] = useState(buttonText);
  const [text, setText] = useState(buttonText);
  const animeFadeInBottomSlow = useAnime(fadeInBottomSlow);
  const addedTest = useRef();

  useEffect(() => {
    if (addedToCart) {
      setText(wp.i18n.__('Added!', 'wpshopify'));
      animeFadeInBottomSlow(addedTest.current);

      setTimeout(function () {
        setText(originalText);
      }, 2000);
    }
  }, [addedToCart]);

  const AddButtonTextCSS = css`
    display: block;
    margin: 0;
    padding: 0;
    color: ${addToCartButtonTextColor ? addToCartButtonTextColor : 'inherit'};
  `;

  return (
    <FilterHook name='product.addToCart.text' args={[text]}>
      <span css={AddButtonTextCSS} ref={addedTest}>
        {text}
      </span>
    </FilterHook>
  );
}

function ProductAddButton({
  hasLink,
  payload,
  linkTarget,
  linkTo,
  linkWithBuyButton,
  addToCartButtonColor,
  addToCartButtonTextColor,
  isDirectCheckout,
  hasManyVariants,
  productDispatch,
  buttonText,
  selectedVariant,
  addedToCart,
  isTouched,
  allOptionsSelected,
  quantity,
  selectedOptions,
  font,
  fontWeight,
}) {
  return (
    <div className='wps-component wps-component-products-add-button wps-btn-wrapper'>
      <AddButtonWrapper
        hasLink={hasLink}
        payload={payload}
        linkTarget={linkTarget}
        linkTo={linkTo}
        linkWithBuyButton={linkWithBuyButton}
        isDirectCheckout={isDirectCheckout}>
        <AddButton
          hasLink={hasLink}
          linkWithBuyButton={linkWithBuyButton}
          addToCartButtonColor={addToCartButtonColor}
          addToCartButtonTextColor={addToCartButtonTextColor}
          loader={<Loader />}
          isDirectCheckout={isDirectCheckout}
          hasManyVariants={hasManyVariants}
          productDispatch={productDispatch}
          buttonText={buttonText}
          addedToCart={addedToCart}
          allOptionsSelected={allOptionsSelected}
          quantity={quantity}
          selectedOptions={selectedOptions}
          payload={payload}
          font={font}
          fontWeight={fontWeight}
        />
      </AddButtonWrapper>

      {wpshopify.misc.isPro && (
        <ProductBuyButtonLeftInStock
          isTouched={isTouched}
          payload={payload}
          selectedVariant={selectedVariant}
          allOptionsSelected={allOptionsSelected}
        />
      )}
    </div>
  );
}

export default wp.element.memo(ProductAddButton);
