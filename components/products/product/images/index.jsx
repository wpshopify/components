import { ProductGalleryWrapper } from './gallery/wrapper';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '../../../../common/utils';

function ProductImages({ payloadSettings, payload }) {
  return usePortal(
    <ProductGalleryWrapper payloadSettings={payloadSettings} payload={payload} />,
    findPortalElement(payloadSettings.dropzoneProductGallery)
  );
}

export default ProductImages;
