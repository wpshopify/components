import { ProductBuyButtonContext } from '../_state/context'
import ProductBuyButtonLeftInStock from '../left-in-stock'
import { Loader } from '../../../../loader'
import { useAnime, pulse, fadeInBottomSlow } from '../../../../../common/animations'
import { FilterHook } from '../../../../../common/utils'
import { buttonCSS } from '../../../../../common/css'
import { Link } from '../../../../link'

import { checkoutRedirect } from '../../../../cart/checkout'

import {
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
  getCache,
  buildClient,
} from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { Notice } = wp.components
const { useContext, useRef, useEffect, useState } = wp.element

function findVariantFromSelections(buyButtonState) {
  return findVariantFromSelectedOptions(buyButtonState.product, buyButtonState.selectedOptions)
}

function findSingleVariantFromPayload(buyButtonState) {
  return buyButtonState.product.variants[0]
}

function buildAddToCartParams(lineItems, variants) {
  var checkoutId = getCache('wps-last-checkout-id')

  return {
    checkoutId: checkoutId,
    lineItems: lineItems,
    variants: variants,
  }
}

function buildLineItemParams(variant, quantity) {
  return [
    {
      variantId: variant.id,
      quantity: quantity,
    },
  ]
}

function AddButtonWrapper({ hasLink, payload, children, linkTo, linkTarget, isDirectCheckout }) {
  return hasLink && !isDirectCheckout ? (
    <Link type='products' payload={payload} linkTo={linkTo} target={linkTarget}>
      {children}
    </Link>
  ) : (
    children
  )
}

function AddButton({
  addToCartButtonColor,
  hasLink,
  isDirectCheckout,
  productDispatch,
  hasManyVariants,
  loader,
  buttonText,
  addedToCart,
}) {
  const [buyButtonState, buyButtonDispatch] = useContext(ProductBuyButtonContext)
  const [isCheckingOut, setIsCheckingOut] = useState(false)
  const [hasNotice, setHasNotice] = useState(false)
  const animePulse = useAnime(pulse)
  const button = useRef()

  useEffect(() => {
    if (buyButtonState.allOptionsSelected) {
      animePulse(button.current)
    }
  }, [buyButtonState.allOptionsSelected])

  const customBackgroundColor = css`
    && {
      background-color: ${addToCartButtonColor};
    }
  `

  async function handleClick(e) {
    if (hasLink && !isDirectCheckout) {
      return
    }

    e.preventDefault()

    // check if all options are selected
    // if some are not selected, highlight them / shake them
    if (!buyButtonState.allOptionsSelected && hasManyVariants) {
      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      return
    }

    if (hasManyVariants) {
      var variant = findVariantFromSelections(buyButtonState)
    } else {
      var variant = findSingleVariantFromPayload(buyButtonState)
    }

    if (!variant) {
      // TODO: Handle this better
      console.error('WP Shopify error: handleClick variant undefined ')

      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
      buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
      return
    }

    const lineItems = buildLineItemParams(variant, buyButtonState.quantity)

    if (isDirectCheckout) {
      const client = buildClient()

      setIsCheckingOut(true)

      const [err, checkout] = await to(createUniqueCheckout(client))

      if (err) {
        setIsCheckingOut(false)
        buyButtonDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        })
        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

        setHasNotice({
          type: 'error',
          message: err,
        })

        return
      }

      const [error, respNewCheckout] = await to(addLineItemsAPI(client, checkout, lineItems))

      if (error) {
        setIsCheckingOut(false)
        buyButtonDispatch({
          type: 'SET_ALL_SELECTED_OPTIONS',
          payload: false,
        })
        buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })

        setHasNotice({
          type: 'error',
          message: error,
        })
        return
      }

      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

      checkoutRedirect(respNewCheckout, buyButtonDispatch)
    } else {
      let addToCartParams = buildAddToCartParams(lineItems, [variant])

      buyButtonDispatch({
        type: 'SET_ALL_SELECTED_OPTIONS',
        payload: false,
      })

      buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
      productDispatch({ type: 'SET_ADDED_VARIANT', payload: variant })
      productDispatch({ type: 'SET_SELECTED_VARIANT', payload: false })
      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: false })

      wp.hooks.doAction('cart.toggle', 'open')
      wp.hooks.doAction('product.addToCart', addToCartParams)
      wp.hooks.doAction('after.product.addToCart', lineItems, variant)
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
        title={buyButtonState.product.title}
        data-wps-is-direct-checkout={isDirectCheckout ? '1' : '0'}
        onClick={handleClick}
        css={[buttonCSS, customBackgroundColor]}
        disabled={isCheckingOut}>
        {isCheckingOut ? (
          loader
        ) : (
          <AddButtonText addedToCart={addedToCart} buttonText={buttonText} />
        )}
      </button>

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false}>
          <FilterHook name='notice.product.addToCart.text'>{hasNotice.message}</FilterHook>
        </Notice>
      )}
    </>
  )
}

function AddButtonText({ buttonText, addedToCart }) {
  const [originalText] = useState(buttonText)
  const [text, setText] = useState(buttonText)
  const animeFadeInBottomSlow = useAnime(fadeInBottomSlow)
  const addedTest = useRef()

  useEffect(() => {
    if (addedToCart) {
      setText(wp.i18n.__('Added!', 'wpshopify'))
      animeFadeInBottomSlow(addedTest.current)

      setTimeout(function () {
        setText(originalText)
      }, 2000)
    }
  }, [addedToCart])

  const AddButtonTextCSS = css`
    display: block;
    margin: 0;
    padding: 0;
  `

  return (
    <FilterHook name='product.addToCart.text' args={[text]}>
      <span css={AddButtonTextCSS} ref={addedTest}>
        {text}
      </span>
    </FilterHook>
  )
}

function ProductAddButton({
  hasLink,
  payload,
  linkTarget,
  linkTo,
  addToCartButtonColor,
  isDirectCheckout,
  hasManyVariants,
  productDispatch,
  buttonText,
  selectedVariant,
  addedToCart,
  isTouched,
}) {
  return (
    <div className='wps-component wps-component-products-add-button wps-btn-wrapper'>
      <AddButtonWrapper
        hasLink={hasLink}
        payload={payload}
        linkTarget={linkTarget}
        linkTo={linkTo}
        isDirectCheckout={isDirectCheckout}>
        <AddButton
          hasLink={hasLink}
          addToCartButtonColor={addToCartButtonColor}
          loader={<Loader />}
          isDirectCheckout={isDirectCheckout}
          hasManyVariants={hasManyVariants}
          productDispatch={productDispatch}
          buttonText={buttonText}
          addedToCart={addedToCart}
        />
      </AddButtonWrapper>

      {wpshopify.misc.isPro && (
        <ProductBuyButtonLeftInStock
          isTouched={isTouched}
          payload={payload}
          selectedVariant={selectedVariant}
        />
      )}
    </div>
  )
}

export default wp.element.memo(ProductAddButton)
