import { ProductGalleryWrapper } from './gallery/wrapper'
import { ProductContext } from '../_state/context'
import { ItemsContext } from '../../../items/_state/context'
import { usePortal } from '../../../../common/hooks'
import { findPortalElement } from '../../../../common/utils'

const { useContext } = wp.element

function ProductImages() {
  const [productState] = useContext(ProductContext)
  const [itemsState] = useContext(ItemsContext)

  return usePortal(
    <ProductGalleryWrapper
      payloadSettings={itemsState.payloadSettings}
      productState={productState}
    />,
    findPortalElement(itemsState.payloadSettings.dropzoneProductGallery)
  )
}

export { ProductImages }
