import { ProductPrices } from './prices';
import { ProductPricingProvider } from './_state/provider';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '../../../../common/utils';

function ProductPricing({ payloadSettings, payload }) {
  return usePortal(
    <ProductPricingProvider payloadSettings={payloadSettings} payload={payload}>
      <ProductPrices payloadSettings={payloadSettings} />
    </ProductPricingProvider>,
    findPortalElement(payloadSettings.dropzoneProductPricing)
  );
}

export default ProductPricing;
