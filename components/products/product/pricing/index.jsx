import { ProductPrices } from './prices';
import { ProductPricingProvider } from './_state/provider';
import { usePortal } from '../../../../common/hooks';
import { findPortalElement } from '/Users/andrew/www/devil/devilbox-new/data/www/wpshopify-utils';
import { useProductState } from '../_state/hooks';

function ProductPricing() {
  const productState = useProductState();

  return usePortal(
    <ProductPricingProvider
      payloadSettings={productState.payloadSettings}
      payload={productState.payload}>
      <ProductPrices payloadSettings={productState.payloadSettings} />
    </ProductPricingProvider>,
    findPortalElement(productState.payloadSettings.dropzoneProductPricing)
  );
}

export default wp.element.memo(ProductPricing);
