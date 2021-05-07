import { ProductProvider } from './_state/provider';
import { ProductWrapper } from './wrapper';

function Product({ payload, payloadSettings, componentId }) {
  return (
    <ProductProvider payload={payload} payloadSettings={payloadSettings}>
      <ProductWrapper payloadSettings={payloadSettings} componentId={componentId} />
    </ProductProvider>
  );
}

export { Product };
