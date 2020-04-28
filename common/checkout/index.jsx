import isEmpty from 'lodash/isEmpty'

function hasCustomCheckoutAttributes(cartState) {
  if (!wpshopify.misc.isPro) {
    return false
  }

  if (!isEmpty(cartState.customAttributes) || !isEmpty(cartState.note)) {
    return true
  }

  return false
}

export { hasCustomCheckoutAttributes }
