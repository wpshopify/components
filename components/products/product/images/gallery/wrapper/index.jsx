/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { ProductGallery } from '../index'
import { ProductGalleryProvider } from '../_state/provider.jsx'

function ProductGalleryWrapper({ payloadSettings, productState }) {
  const ProductGalleryWrapperCSS = css`
    margin-bottom: 15px;
  `

  return (
    <div className='wps-component wps-component-products-images' css={ProductGalleryWrapperCSS}>
      <ProductGalleryProvider productState={productState}>
        <ProductGallery payloadSettings={payloadSettings} />
      </ProductGalleryProvider>
    </div>
  )
}

export { ProductGalleryWrapper }
