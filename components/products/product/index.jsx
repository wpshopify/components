import ProductProvider from './_state/provider';
import ProductWrapper from './wrapper';

function Product({ payload, payloadSettings, componentId }) {
  return (
    <ProductProvider payload={payload} payloadSettings={payloadSettings} componentId={componentId}>
      <ProductWrapper />
    </ProductProvider>
  );
}

export default Product;
