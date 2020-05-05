import { ProductBuyButtonContext } from '../_state/context'
import ProductBuyButtonLeftInStock from '../left-in-stock'

import { Loader } from '../../../../loader'
import { useAnime, pulse } from '../../../../../common/animations'
import { FilterHook, __t } from '../../../../../common/utils'
import { Link } from '../../../../link'

import { checkoutRedirect } from '../../../../cart/checkout'

import {
  findVariantFromSelectedOptions,
  createUniqueCheckout,
  addLineItemsAPI,
  getCache,
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
}) {
  console.log('<ProductAddButton> :: Render Start')
  return (
    <div
      className='wps-component wps-component-products-add-button wps-btn-wrapper'
      data-wps-is-component-wrapper
      data-wps-post-id=''>
      <AddButtonWrapper hasLink={hasLink} payload={payload} linkTarget={linkTarget} linkTo={linkTo}>
        <AddButton
          addToCartButtonColor={addToCartButtonColor}
          loader={<Loader />}
          isDirectCheckout={isDirectCheckout}
          hasManyVariants={hasManyVariants}
          productDispatch={productDispatch}>
          <FilterHook name='product.addToCart.text'>{__t(buttonText)}</FilterHook>
        </AddButton>
      </AddButtonWrapper>
      <ProductBuyButtonLeftInStock selectedVariant={selectedVariant} />
    </div>
  )
}

function AddButtonWrapper({ hasLink, payload, children, linkTo, linkTarget }) {
  console.log('<AddButtonWrapper> :: Render Start')
  return hasLink ? (
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
  children,
}) {
  console.log('<AddButton> :: Render Start')
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

  const buttonStyle = css`
    background-color: ${addToCartButtonColor};
  `

  async function handleClick(e) {
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

    console.log('.......................... variant', variant)

    if (!variant) {
      // TODO: Handle this better
      console.error('WP Shopify error: handleClick variant undefined ')

      buyButtonDispatch({ type: 'SET_MISSING_SELECTIONS', payload: true })
      buyButtonDispatch({ type: 'SET_ALL_SELECTED_OPTIONS', payload: false })
      buyButtonDispatch({ type: 'REMOVE_SELECTED_OPTIONS' })
      return
    }

    const lineItems = buildLineItemParams(variant, buyButtonState.quantity)

    console.log('.......................... lineItems', lineItems)

    if (isDirectCheckout) {
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
      console.log('.......................... addToCartParams', addToCartParams)

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
        title={__t(buyButtonState.product.title)}
        data-wps-is-direct-checkout={isDirectCheckout ? '1' : '0'}
        onClick={(e) => {
          !hasLink && handleClick(e)
        }}
        css={buttonStyle}
        disabled={isCheckingOut}>
        {isCheckingOut ? loader : children}
      </button>

      {hasNotice && (
        <Notice status={hasNotice.type} isDismissible={false}>
          <FilterHook name='notice.product.addToCart.text'>{__t(hasNotice.message)}</FilterHook>
        </Notice>
      )}
    </>
  )
}

export { ProductAddButton }
