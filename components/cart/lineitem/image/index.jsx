/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq } from '../../../../common/css'
import { addCustomSizingToImageUrl } from '../../../../common/images'
import { Link } from '../../../link'

function CartLineItemImage({ lineItem, cartState }) {
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

  const lineItemImgCSS = css`
    background-image: url(${lineItem.image ? actualImageUrl() : placeholderImageUrl()});
    width: 100px;
    height: 100px;
    border-radius: 5px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center center;
    background-color: #e5e5e5;

    ${mq('small')} {
      width: 60px;
      height: 60px;
    }
  `

  return (
    <Link
      payload={lineItem}
      type='products'
      classNames='wps-cart-lineitem-img-link'
      target='_blank'
      manualLink={manualLink}
      disableLink={disableLink}>
      <div className='wps-cart-lineitem-img' css={[lineItemImgCSS]} />
    </Link>
  )
}

export { CartLineItemImage }
