import { ProductGallery } from '../index'
import { ProductGalleryProvider } from '../_state/provider.jsx'

function ProductGalleryWrapper({ payloadSettings, productState }) {
  return (
    <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
      <ProductGalleryProvider productState={productState}>
        <ProductGallery payloadSettings={payloadSettings} />
      </ProductGalleryProvider>
    </div>
  )
}

export { ProductGalleryWrapper }
