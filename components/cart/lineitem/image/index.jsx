/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq } from '../../../../common/css'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { Link } from '../../../link'

function CartLineItemImage({ lineItem, shopState, cartState }) {
  const manualLink = wp.hooks.applyFilters('cart.lineItems.link', false, lineItem, cartState)

  const disableLink = wp.hooks.applyFilters(
    'cart.lineItems.disableLink',
    false,
    lineItem,
    cartState
  )

  function placeholderImageUrl() {
    return wpshopify.misc.pluginsDirURL + 'public/imgs/placeholder.png'
  }

  function actualImageUrl() {
    return addCustomSizingToImageUrl({
      src: lineItem.image.src,
      width: 300,
      height: 300,
      crop: 'center',
    })
  }

  function lineItemImage() {
    return lineItem.image
      ? { backgroundImage: `url(${actualImageUrl()})` }
      : { backgroundImage: `url(${placeholderImageUrl()})` }
  }

  return (
    <Link
      payload={lineItem}
      shop={shopState}
      type='products'
      classNames='wps-cart-lineitem-img-link'
      target='_blank'
      manualLink={manualLink}
      disableLink={disableLink}>
      <div
        className='wps-cart-lineitem-img'
        style={lineItemImage()}
        data-wps-is-ready={shopState.isCartReady ? '1' : '0'}
      />
    </Link>
  )
}

export { CartLineItemImage }
