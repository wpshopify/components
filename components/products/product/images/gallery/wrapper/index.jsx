import { ProductGallery } from '../index'
import { ProductGalleryProvider } from '../_state/provider.jsx'

function ProductGalleryWrapper({ productState }) {
  return (
    <div className='wps-component wps-component-products-images' data-wps-component-order='0'>
      <ProductGalleryProvider productState={productState}>
        <ProductGallery />
      </ProductGalleryProvider>
    </div>
  )
}

export { ProductGalleryWrapper }
