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

function isHidingPagination(itemsState) {
  if (wpshopify.settings.general.hidePagination) {
    return true
  }

  console.log(
    'itemsState.payloadSettings.pagination',
    itemsState.payloadSettings.pagination,
    itemsState
  )

  if (!itemsState.payloadSettings.pagination) {
    return true
  }

  if (
    itemsState.payloadSettings.limit &&
    itemsState.payloadSettings.limit <= itemsState.payloadSettings.pageSize
  ) {
    return true
  }

  if (!itemsState.hasMoreItems) {
    return true
  }

  return false
}

export { checkNextPage, checkPrevPage, checkHasResults, isHidingPagination }
