import { formatPriceToCurrency } from './formatting'

function PrettyPrice({ price, currencyCode }) {
  return formatPriceToCurrency(price, currencyCode)
}

export default wp.element.memo(PrettyPrice)
