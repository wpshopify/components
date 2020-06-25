import isEmpty from 'lodash/isEmpty'

const isShowingComponent = (payloadSettings, type) => {
  if (!payloadSettings.excludes || isEmpty(payloadSettings.excludes)) {
    return true
  }

  if (payloadSettings.isSingular) {
    return true
  }

  if (type === 'description' && wpshopify.misc.postID === wpshopify.settings.general.pageProducts) {
    return wpshopify.settings.general.productsPlpDescriptionsToggle
  }

  return !payloadSettings.excludes.includes(type)
}

export { isShowingComponent }
