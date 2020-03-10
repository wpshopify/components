import { ShopContext } from '../../../shop/_state/context'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, FilterHook } from '../../../../common/utils'
import { Link } from '../../../link'
import { hasLink } from '../../../../common/settings'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element
const { __ } = wp.i18n

function ProductTitle() {
  const [shopState] = useContext(ShopContext)
  const [productState] = useContext(ProductContext)
  const [itemsState] = useContext(ItemsContext)

  const fontSize = css`
    && {
      font-size: ${itemsState.payloadSettings.titleSize};
    }
  `

  const fontColor = css`
    && {
      color: ${itemsState.payloadSettings.titleColor};
    }
  `

  function getTitleClass() {
    return wp.hooks.applyFilters('product.title.class', 'wps-products-title')
  }

  console.log('>>>>> itemsState.payloadSettings', itemsState.payloadSettings)

  return usePortal(
    <div className='wps-component wps-component-products-title' data-wps-component-order='0'>
      {hasLink(itemsState, shopState) ? (
        <Link
          type='products'
          payload={productState.payload}
          shop={shopState}
          target={itemsState.payloadSettings.linkTarget}
          linkTo={itemsState.payloadSettings.linkTo}>
          <Title
            styles={[fontSize, fontColor]}
            title={productState.payload.title}
            classList={getTitleClass()}
            isShopReady={shopState.isShopReady ? '1' : '0'}
            product={productState.payload}
          />
        </Link>
      ) : (
        <Title
          styles={[fontSize, fontColor]}
          title={productState.payload.title}
          classList={getTitleClass()}
          isShopReady={shopState.isShopReady ? '1' : '0'}
          product={productState.payload}
        />
      )}
    </div>,
    findPortalElement(productState.element, itemsState.payloadSettings.dropzoneProductTitle)
  )
}

function Title(props) {
  return (
    <>
      <FilterHook
        name='before.product.title'
        hasHTML={true}
        args={[props.product]}
        isReady={props.isShopReady}
      />

      <h2
        itemProp='name'
        className={props.classList}
        data-wps-is-ready={props.isShopReady}
        css={props.styles}>
        <FilterHook name='product.title.text'>
          {__(props.title, wpshopify.misc.textdomain)}
        </FilterHook>
      </h2>

      <FilterHook
        name='after.product.title'
        hasHTML={true}
        args={[props.product]}
        isReady={props.isShopReady}
      />
    </>
  )
}

export default ProductTitle
