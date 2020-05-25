import { formatPriceToCurrency } from './formatting'

function PrettyPrice({ price, currencyCode }) {
  console.log('............... PrettyPrice')
  return formatPriceToCurrency(price, currencyCode)
}

export default wp.element.memo(PrettyPrice)
