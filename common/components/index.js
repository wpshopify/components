import isEmpty from 'lodash/isEmpty'

const isShowingComponent = (payloadSettings, type) => {
  if (!payloadSettings.excludes || isEmpty(payloadSettings.excludes)) {
    if (type === 'description') {
      return wpshopify.settings.general.productsPlpDescriptionsToggle
    }

    return true
  }

  if (payloadSettings.isSingular) {
    return true
  }

  return !payloadSettings.excludes.includes(type)
}

export { isShowingComponent }
