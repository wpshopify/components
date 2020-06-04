import isEmpty from 'lodash/isEmpty'

function checkNextPage(items) {
  if (!items || items.length == 0) {
    return false
  }

  return items[items.length - 1].hasNextPage
}

function checkPrevPage(items) {
  if (!items || items.length == 0) {
    return false
  }

  return items[0].hasPreviousPage
}

function checkHasResults(items) {
  return !isEmpty(items)
}

function isHidingPagination(payloadSettings, hasMoreItems) {
  if (wpshopify.settings.general.hidePagination) {
    return true
  }

  if (!payloadSettings.pagination) {
    return true
  }

  if (payloadSettings.limit && payloadSettings.limit <= payloadSettings.pageSize) {
    return true
  }

  if (!hasMoreItems) {
    return true
  }

  return false
}

export { checkNextPage, checkPrevPage, checkHasResults, isHidingPagination }
