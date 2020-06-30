import { ProductContext } from '../_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement, FilterHook } from '../../../../common/utils'
import { Link } from '../../../link'
import { hasLink } from '../../../../common/settings'

/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const { useContext } = wp.element

function ProductTitle({ payloadSettings }) {
  const [productState] = useContext(ProductContext)

  const titleStyles = css`
    && {
      font-size: ${payloadSettings.titleSize};
      color: ${payloadSettings.titleColor};
      white-space: normal;
    }
  `

  const titleStylesWrapper = css`
    margin-bottom: 15px;
  `

  function getTitleClass() {
    return wp.hooks.applyFilters('product.title.class', 'wps-products-title')
  }

  return usePortal(
    <div
      className='wps-component wps-component-products-title'
      data-wps-component-order='0'
      css={titleStylesWrapper}>
      {hasLink(payloadSettings) ? (
        <Link
          type='products'
          payload={productState.payload}
          target={payloadSettings.linkTarget}
          linkTo={payloadSettings.linkTo}>
          <Title
            styles={titleStyles}
            title={productState.payload.title}
            classList={getTitleClass()}
            product={productState.payload}
          />
        </Link>
      ) : (
        <Title
          styles={titleStyles}
          title={productState.payload.title}
          classList={getTitleClass()}
          product={productState.payload}
        />
      )}
    </div>,
    findPortalElement(productState.element, payloadSettings.dropzoneProductTitle)
  )
}

function Title(props) {
  return (
    <>
      <FilterHook name='before.product.title' hasHTML={true} args={[props.product]} />

      <h2 itemProp='name' className={props.classList} css={props.styles}>
        <FilterHook name='product.title.text'>{props.title}</FilterHook>
      </h2>

      <FilterHook name='after.product.title' hasHTML={true} args={[props.product]} />
    </>
  )
}

export { ProductTitle }
