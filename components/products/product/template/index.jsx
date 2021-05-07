import JsxParser from 'react-jsx-parser';
import ProductBuyButton from '../buy-button';
import ProductTitle from '../title';
import ProductPricing from '../pricing';
import ProductDescription from '../description';
import ProductImages from '../images';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../error-fallback';

function ProductCustomTemplate({ payloadSettings, payload }) {
  return (
    <ErrorBoundary FallbackComponent={ErrorFallback}>
      <JsxParser
        components={{
          ProductBuyButton,
          ProductTitle,
          ProductPricing,
          ProductDescription,
          ProductImages,
        }}
        bindings={{
          payloadSettings: payloadSettings,
          payload: payload,
        }}
        renderInWrapper={false}
        showWarnings={true}
        jsx={payloadSettings.htmlTemplate}
        blacklistedTags={['script']}
      />
    </ErrorBoundary>
  );
}

export default wp.element.memo(ProductCustomTemplate);
