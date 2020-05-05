import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'
import { FilterHook, __t } from '../../../../../common/utils'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'

const ProductPriceSingle = React.forwardRef((props, ref) => {
  const priceCSS = css`
    display: inline-block;
    line-height: 1;
    padding: 0;
    font-weight: ${props.compareAt ? 'normal' : 'bold'};
    margin: ${!props.compareAt
      ? '0'
      : props.compareAt && !props.showPriceRange
      ? '0'
      : props.compareAt && props.showPriceRange
      ? '0'
      : '0'};
    font-size: ${props.compareAt ? '16px' : '22px'};
    color: ${props.compareAt ? '#848484' : '#121212'};
    text-decoration: ${props.compareAt ? 'line-through' : 'none'};
  `

  return (
    props.price && (
      <span ref={ref} className='wps-product-individual-price' css={priceCSS}>
        {props.compareAt && !props.showPriceRange && (
          <FilterHook name='product.pricing.from.text' args={[props.compareAt]}>
            {__t('Was: ')}
          </FilterHook>
        )}
        {formatPriceToCurrency(props.price, props.currencyCode)}
      </span>
    )
  )
})

export default wp.element.memo(ProductPriceSingle)
