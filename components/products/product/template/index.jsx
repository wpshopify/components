import JsxParser from 'react-jsx-parser'
import ProductBuyButton from '../buy-button'
import ProductTitle from '../title'
import ProductPricing from '../pricing'
import ProductDescription from '../description'
import ProductImages from '../images'
import { ItemsContext } from '../../../items/_state/context'
import { ErrorBoundary } from 'react-error-boundary'
import ErrorFallback from '../../../error-fallback'

function ProductCustomTemplate() {
  const [itemsState] = wp.element.useContext(ItemsContext)

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
        jsx={itemsState.htmlTemplate}
        blacklistedTags={['script']}
      />
    </ErrorBoundary>
  )
}

export default wp.element.memo(ProductCustomTemplate)
