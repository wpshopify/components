import isEmpty from "lodash/isEmpty"
import clone from "lodash/clone"

function getCachedSettings() {
  return JSON.parse(localStorage.getItem("wps-cached-settings"))
}

function getDefaultSettings() {
  return {
    title: [],
    tag: [],
    vendor: [],
    productType: [],
    availableForSale: true,
    productId: [],
    createdAt: [],
    updatedAt: [],
    connective: "AND",
    limit: false,
    sortBy: "title",
    reverse: false,
    pagination: true,
    paginationLoadMore: true,
    paginationHideInitial: false,
    pageSize: 9,
    itemsPerRow: 3,
    excludes: [],
    dropzoneLoadMore: false,
    addToCartButtonColor: "#14273b",
    variantButtonColor: "",
    addToCartButtonText: "Add to cart",
    hideQuantity: false,
    showQuantityLabel: true,
    minQuantity: 1,
    maxQuantity: false,
    showPriceRange: true,
    showCompareAt: false,
    quantityLabelText: "Quantity",
    showFeaturedOnly: false,
    showZoom: false,
    noResultsText: "No products left to show",
    infiniteScroll: false,
    infiniteScrollOffset: 100,
    titleColor: false,
    titleSize: "22px",
    myShopifyDomain: false,
    storefrontAccessToken: false,
    descriptionSize: "16px",
    descriptionColor: false,
    descriptionLength: false,
    alignHeight: false
  }
}

function getBlockEditorElement() {
  return document.getElementById("block-editor-inner")
}

function defaultComponentConnectionParams() {
  return { first: 9, query: "*" }
}

function defaultComponentType() {
  return "products"
}

function getDefaultProductOptions(payload = false) {
  var settings = getSettings()
  var componentConnectionParams = defaultComponentConnectionParams()
  var blockEditorElement = getBlockEditorElement()
  var componentType = defaultComponentType()

  if (!payload) {
    payload = []
  }

  return [
    {
      componentConnectionParams: componentConnectionParams,
      componentElement: blockEditorElement,
      componentId: false,
      componentOptions: settings,
      componentPayload: payload,
      componentPayloadLastCursor: false,
      componentQueryParams: componentConnectionParams,
      componentType: componentType
    }
  ]
}

function getSettings() {
  var cachedSettings = getCachedSettings()
  var defaultSettings = getDefaultSettings()

  // If we have a cached version, use this instead
  if (!isEmpty(cachedSettings)) {
    return clone(cachedSettings)
  } else {
    return clone(defaultSettings)
  }
}

function BuilderInitialState(options) {
  return {
    isReady: false,
    isShopReady: false,
    isLoading: false,
    hasCustomConnection: false,
    notices: [],
    payload: false,
    defaultShortcode: "[wps_products]",
    defaultComponentConnectionParams: defaultComponentConnectionParams(),
    defaultCreds: WP_Shopify.storefront,
    defaultComponentType: defaultComponentType(),
    defaultEditorElement: getBlockEditorElement(),
    shortcode: "[wps_products]",
    defaultSettings: getDefaultSettings(),
    productOptions: getDefaultProductOptions(),
    settings: getSettings()
  }
}

export {
  BuilderInitialState,
  getDefaultSettings,
  getDefaultProductOptions,
  getSettings
}
