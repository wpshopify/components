import { ProductGalleryWrapper } from './gallery/wrapper';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { useProductState } from '../_state/hooks';

function ProductImages() {
  const productState = useProductState();

  return usePortal(
    <ProductGalleryWrapper
      payloadSettings={productState.payloadSettings}
      payload={productState.payload}
    />,
    findPortalElement(productState.payloadSettings.dropzoneProductGallery)
  );
}

export default wp.element.memo(ProductImages);
