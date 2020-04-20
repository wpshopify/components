import { CartContext } from '../_state/context'
import { ShopContext } from '../../shop/_state/context'
import { useAction, useCartToggle } from '../../../common/hooks'
import { findTotalCartQuantities } from '../../../common/cart'
import { useAnime, slideOutCart, slideInCart } from '../../../common/animations'
import isEmpty from 'lodash/isEmpty'
import { getProductsFromLineItems } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-api'
import to from 'await-to-js'

const { useContext, useRef, useEffect } = wp.element
const { __ } = wp.i18n
const { Spinner } = wp.components
const { Suspense } = wp.element

const CartHeader = wp.element.lazy(() => import(/* webpackChunkName: 'CartHeader' */ '../header'))
const CartContents = wp.element.lazy(() =>
  import(/* webpackChunkName: 'CartContents' */ '../contents')
)
const CartFooter = wp.element.lazy(() => import(/* webpackChunkName: 'CartFooter' */ '../footer'))
// const CartButtons = wp.element.lazy(() =>
//   import(/* webpackChunkName: 'CartButtons' */ '../buttons')
// )

import { CartButtons } from '../buttons'
import { useIsFirstRender } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-hooks'

function CartWrapper() {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [shopState, shopDispatch] = useContext(ShopContext)
  const cartElement = useRef()
  const isFirstRender = useIsFirstRender()
  const updateCheckoutAttributes = useAction('update.checkout.attributes')
  const setCheckoutAttributes = useAction('set.checkout.attributes')
  const setCheckoutNotes = useAction('set.checkout.note')
  const lineItemsAdded = useAction('product.addToCart')
  const openCart = useAction('cart.toggle')
  const animeSlideInRight = useAnime(slideInCart)
  const animeSlideOutRight = useAnime(slideOutCart)
  const isCartOpen = useCartToggle(cartElement, cartState)

  async function cartBootstrap() {
    let [productsError, products] = await to(getProductsFromLineItems())

    if (productsError) {
      shopDispatch({
        type: 'UPDATE_NOTICES',
        payload: {
          type: 'error',
          message: __(productsError, wpshopify.misc.textdomain),
        },
      })
    }

    cartDispatch({
      type: 'SET_CHECKOUT_CACHE',
      payload: { checkoutId: shopState.checkoutId },
    })

    cartDispatch({
      type: 'SET_LINE_ITEMS_AND_VARIANTS',
      payload: {
        lineItems: { products: products },
        checkoutId: shopState.checkoutId,
      },
    })

    if (isEmpty(products)) {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
    } else {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
    }

    shopDispatch({ type: 'IS_CART_READY', payload: true })
  }

  useEffect(() => {
    if (!shopState.checkoutId) {
      return
    }

    cartBootstrap()
  }, [shopState.checkoutId])

  useEffect(() => {
    cartDispatch({
      type: 'SET_TOTAL_LINE_ITEMS',
      payload: findTotalCartQuantities(cartState.checkoutCache.lineItems),
    })
  }, [shopState.isCartReady, cartState.checkoutCache.lineItems])

  useEffect(() => {
    wp.hooks.doAction('on.checkout.update', cartState)
  }, [cartState.totalLineItems])

  useEffect(() => {
    shopDispatch({
      type: 'UPDATE_CHECKOUT_ATTRIBUTES',
      payload: updateCheckoutAttributes,
    })
  }, [updateCheckoutAttributes])

  useEffect(() => {
    shopDispatch({
      type: 'SET_CHECKOUT_ATTRIBUTES',
      payload: setCheckoutAttributes,
    })
  }, [setCheckoutAttributes])

  useEffect(() => {
    shopDispatch({ type: 'SET_CHECKOUT_NOTE', payload: setCheckoutNotes })
  }, [setCheckoutNotes])

  useEffect(() => {
    if (isCartOpen || openCart) {
      animeSlideInRight(cartElement.current)
    } else {
      animeSlideOutRight(cartElement.current)
    }
  }, [isCartOpen, openCart])

  useEffect(() => {
    if (lineItemsAdded) {
      cartDispatch({
        type: 'UPDATE_LINE_ITEMS_AND_VARIANTS',
        payload: lineItemsAdded,
      })
      cartDispatch({ type: 'TOGGLE_CART', payload: true })
    }

    if (isEmpty(lineItemsAdded)) {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: true })
    } else {
      cartDispatch({ type: 'SET_IS_CART_EMPTY', payload: false })
    }
  }, [lineItemsAdded])

  return (
    <section ref={cartElement} className='wps-cart'>
      <CartButtons buttons={cartState.buttons} />
      <Suspense fallback={<Spinner />}>
        {shopState.settings.general.cartLoaded && cartState.isCartLoaded && (
          <>
            <CartHeader />
            <CartContents
              isCartReady={shopState.isCartEmpty}
              isCartEmpty={cartState.isCartEmpty}
              checkoutCache={cartState.checkoutCache}
            />
            <CartFooter />
          </>
        )}
      </Suspense>
    </section>
  )
}

export { CartWrapper }
