import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'
import { FilterHook, __t } from '../../../../../common/utils'

const ProductPriceSingle = React.forwardRef((props, ref) => {
  return (
    props.price && (
      <span ref={ref} className='wps-product-individual-price'>
        {props.compareAt && (
          <FilterHook name='product.pricing.from.text' args={[props.compareAt]}>
            {__t('Was: ')}
          </FilterHook>
        )}
        {formatPriceToCurrency(props.price, props.currencyCode)}
      </span>
    )
  )
})

export { ProductPriceSingle }
