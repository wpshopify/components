import PrettyPrice from '../../../../../common/pricing/pretty'
import { FilterHook } from '../../../../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductPriceSingle = React.forwardRef((props, ref) => {
  const priceCSS = css`
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: ${props.compareAt ? '15px' : '18px'};
    color: ${props.compareAt ? '#848484' : '#121212'};
    text-decoration: ${props.compareAt ? 'line-through' : 'none'};
  `

  return (
    <span ref={ref} className='wps-product-individual-price' css={priceCSS}>
      {props.compareAt && !props.showPriceRange && (
        <FilterHook name='product.pricing.from.text' args={[props.compareAt]}>
          {wp.i18n.__('Was: ', 'wpshopify')}
        </FilterHook>
      )}

      <PrettyPrice price={props.price} currencyCode={props.currencyCode} />
    </span>
  )
})

export default wp.element.memo(ProductPriceSingle)
