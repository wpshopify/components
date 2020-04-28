import { formatPriceToCurrency } from '../../../../../common/pricing/formatting'

const ProductPriceSingle = React.forwardRef((props, ref) => {
  return (
    props.price && (
      <span ref={ref} className='wps-product-individual-price'>
        {formatPriceToCurrency(props.price, props.currencyCode)}
      </span>
    )
  )
})

export { ProductPriceSingle }
