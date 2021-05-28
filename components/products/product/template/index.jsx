import JsxParser from 'react-jsx-parser';
import ProductBuyButton from '../buy-button';
import ProductTitle from '../title';
import ProductPricing from '../pricing';
import ProductDescription from '../description';
import ProductImages from '../images';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from '../../../error-fallback';
import { useItemsState } from '../../../items/_state/hooks';

function ProductCustomTemplate({ customHtmlData }) {
  const itemsState = useItemsState();

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
        renderInWrapper={false}
        showWarnings={true}
        jsx={customHtmlData ? customHtmlData : itemsState.htmlTemplateData}
        blacklistedTags={['script']}
      />
    </ErrorBoundary>
  );
}

export default wp.element.memo(ProductCustomTemplate);
