/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useAnime, pulse, fadeInBottomSlow } from '../../../../../common/animations';
import { FilterHook } from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-utils';
import { buttonCSS } from '../../../../../common/css';
import { checkoutRedirect } from '../../../../cart/checkout/common';

import {
  maybeFetchShop,
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
  getCache,
  buildClient,
  getCheckoutCache,
} from '/Users/arobbins/www/_devilbox/devilbox/data/www/wpshopify-api';

import to from 'await-to-js';

const Notice = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notice-public' */ '../../../../notice')
);

const Link = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Link-public' */ '../../../../link')
);

const Loader = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Loader-public' */ '../../../../loader')
);

const ProductBuyButtonLeftInStock = wp.element.lazy(() =>
  import(/* webpackChunkName: 'ProductBuyButtonLeftInStock-public' */ '../left-in-stock')
);

const { useRef, useEffect, useState } = wp.element;

function findSingleVariantFromPayload(payload) {
  return payload.variants[0];
}

function defaultLineItemOptions() {
  return {
    minQuantity: false,
    maxQuantity: false,
  };
}

function buildAddToCartParams(lineItems, variants, lineItemOptions = defaultLineItemOptions()) {
  var checkoutId = getCache('wps-last-checkout-id');

  return {
    checkoutId: checkoutId,
    lineItems: lineItems,
    variants: variants,
    lineItemOptions: lineItemOptions,
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

function findLineItemByVariantId(lineItems, variantId) {
  return lineItems.filter((lineItem) => lineItem.variantId === variantId);
}

function hasReachedMaxQuantity(addToCartParams, maxQuantity, variant) {
  var checkoutCache = getCheckoutCache(addToCartParams.checkoutId);
  var foundLineItem = findLineItemByVariantId(checkoutCache.lineItems, variant.id);

  // Not found if variant is missing from the cart
  if (foundLineItem.length <= 0) {
    return false;
  }

  return foundLineItem[0].quantity >= maxQuantity;
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
  payloadSettings,
  linkTo,
}) {
  const [isDisabled, setIsDisabled] = useState(false);
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [hasNotice, setHasNotice] = useState(false);
  const animePulse = useAnime(pulse);
  const button = useRef();

  const maxQuantity = wp.hooks.applyFilters('cart.lineItems.maxQuantity');

  const NoticeCSS = css`
    margin-top: 15px;
  `;

  useEffect(() => {
    if (!allOptionsSelected) {
      setIsDisabled(false);
      setHasNotice(false);
    } else {
      var variant = findVariant();

      if (variant && variant.availableForSale) {
        setIsDisabled(false);
        setHasNotice(false);
        animePulse(button.current);
      } else {
        setIsDisabled(true);
        setHasNotice({
          type: 'warning',
          message: 'Out of stock. Please try selecting a different variant combination.',
        });
      }
    }
  }, [selectedOptions]);

  useEffect(() => {
    if (allOptionsSelected) {
      var variant = findVariant();

      if (variant && variant.availableForSale) {
        setIsDisabled(false);
        setHasNotice(false);
        animePulse(button.current);
      } else {
        setIsDisabled(true);
        setHasNotice({
          type: 'warning',
          message: 'Out of stock. Please try selecting a different variant combination.',
        });
      }
    } else {
      setIsDisabled(false);
      setHasNotice(false);
    }
  }, [allOptionsSelected]);

  const addToCartCSS = css`
    font-family: ${payloadSettings.addToCartButtonTypeFontFamily
      ? payloadSettings.addToCartButtonTypeFontFamily
      : 'inherit'};
    font-weight: ${payloadSettings.addToCartButtonTypeFontWeight
      ? payloadSettings.addToCartButtonTypeFontWeight
      : 'initial'};
    font-style: ${payloadSettings.addToCartButtonTypeFontStyle
      ? payloadSettings.addToCartButtonTypeFontStyle
      : 'initial'};
    font-size: ${payloadSettings.addToCartButtonTypeFontSize
      ? payloadSettings.addToCartButtonTypeFontSize
      : 'initial'};
    letter-spacing: ${payloadSettings.addToCartButtonTypeLetterSpacing
      ? payloadSettings.addToCartButtonTypeLetterSpacing
      : 'initial'};
    line-height: ${payloadSettings.addToCartButtonTypeLineHeight
      ? payloadSettings.addToCartButtonTypeLineHeight
      : 'initial'};
    text-decoration: ${payloadSettings.addToCartButtonTypeTextDecoration
      ? payloadSettings.addToCartButtonTypeTextDecoration
      : 'initial'};
    text-transform: ${payloadSettings.addToCartButtonTypeTextTransform
      ? payloadSettings.addToCartButtonTypeTextTransform
      : 'initial'};
    overflow-y: hidden;

    && {
      background-color: ${addToCartButtonColor};
    }
  `;

  function findVariant() {
    if (hasManyVariants) {
      return findVariantFromSelectedOptions(payload, selectedOptions);
    } else {
      return findSingleVariantFromPayload(payload);
    }
  }

  async function handleClick(e) {
    if (linkTo === 'modal' && wpshopify.misc.isPro && !isDirectCheckout) {
      productDispatch({ type: 'TOGGLE_MODAL', payload: true });
      return;
    }

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

    var variant = findVariant();

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

      const [shopInfoErrors, shopInfo] = await to(maybeFetchShop());

      if (shopInfoErrors) {
        setIsCheckingOut(false);

        setHasNotice({
          type: 'error',
          message: shopInfoErrors,
        });

        return;
      }

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

      checkoutRedirect(respNewCheckout, shopInfo.primaryDomain.url, () => setIsCheckingOut(false));
    } else {
      const resetAfter = wp.hooks.applyFilters('product.buyButton.resetVariantsAfterAdding', true);

      const lineItemOptions = {
        minQuantity: payloadSettings.minQuantity,
        maxQuantity: payloadSettings.maxQuantity,
      };

      let addToCartParams = buildAddToCartParams(lineItems, [variant], lineItemOptions);

      if (maxQuantity && hasReachedMaxQuantity(addToCartParams, maxQuantity, variant)) {
        wp.hooks.doAction('cart.toggle', 'open');
        productDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        });

        productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
        productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });
        return;
      } else {
        if (resetAfter) {
          productDispatch({
            type: 'SET_ALL_SELECTED_OPTIONS',
            payload: false,
          });

          productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });
          productDispatch({ type: 'SET_ADDED_VARIANT', payload: variant });
          productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false });
        }

        productDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false });

        productDispatch({
          type: 'SET_AVAILABLE_VARIANTS',
          payload: [],
        });

        productDispatch({ type: 'REMOVE_SELECTED_OPTIONS' });

        wp.hooks.doAction('cart.toggle', 'open');
        wp.hooks.doAction('product.addToCart', addToCartParams);
        wp.hooks.doAction('after.product.addToCart', lineItems, variant);
      }
    }
  }

  return (
    <>
      <button
        ref={button}
        type='button'
        role='Button'
        itemProp='potentialAction'
        itemScope
        itemType='https://schema.org/BuyAction'
        className='wps-btn wps-btn-secondary wps-add-to-cart'
        data-wps-is-direct-checkout={isDirectCheckout ? '1' : '0'}
        onClick={handleClick}
        css={[buttonCSS, addToCartCSS]}
        disabled={isCheckingOut || isDisabled}>
        {isCheckingOut ? (
          loader
        ) : (
          <AddButtonText
            payload={payload}
            addedToCart={addedToCart}
            buttonText={buttonText}
            addToCartButtonTextColor={addToCartButtonTextColor}
          />
        )}
      </button>

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false} extraCSS={NoticeCSS}>
          <FilterHook name='notice.product.addToCart.text'>{hasNotice.message}</FilterHook>
        </Notice>
      )}
    </>
  );
}

function AddButtonText({ buttonText, addedToCart, addToCartButtonTextColor, payload }) {
  const [originalText] = useState(buttonText);
  const [text, setText] = useState(() => {
    return buttonText ? buttonText : 'Add to cart';
  });
  const animeFadeInBottomSlow = useAnime(fadeInBottomSlow);
  const addedTest = useRef();

  useEffect(() => {
    if (addedToCart) {
      const addedText = wp.hooks.applyFilters(
        'product.buyButton.addedText',
        wp.i18n.__('We like that one too!', 'wpshopify')
      );

      setText(addedText);
      animeFadeInBottomSlow(addedTest.current);

      setTimeout(function () {
        if (addedTest.current) {
          setText(originalText);
        }
      }, 3000);
    }
  }, [addedToCart]);

  const AddButtonTextCSS = css`
    display: block;
    margin: 0;
    padding: 0;
    color: ${addToCartButtonTextColor ? addToCartButtonTextColor : 'inherit'};
  `;

  return (
    <FilterHook name='product.addToCart.text' args={[text, payload]}>
      <span css={AddButtonTextCSS} ref={addedTest} aria-label='Product Add to Cart Text'>
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
  payloadSettings,
}) {
  return (
    <div
      className='wps-component wps-component-products-add-button wps-btn-wrapper'
      aria-label='Product Add Button'>
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
          payloadSettings={payloadSettings}
          linkTo={linkTo}
        />
      </AddButtonWrapper>

      {wpshopify.misc.isPro && wp.hooks.applyFilters('misc.show.inventoryLevels', true) && (
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
