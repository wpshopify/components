import JsxParser from 'react-jsx-parser'
import ProductBuyButton from '../buy-button'
import ProductTitle from '../title'
import ProductPricing from '../pricing'
import ProductDescription from '../description'
import ProductImages from '../images'

function ProductCustomTemplate({ htmlTemplate }) {
  return (
    <JsxParser
      components={{
        ProductBuyButton,
        ProductTitle,
        ProductPricing,
        ProductDescription,
        ProductImages,
      }}
      renderInWrapper={false}
      jsx={htmlTemplate}
    />
  )
}

export default wp.element.memo(ProductCustomTemplate)
