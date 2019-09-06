(window["wpshopifyComponents"] = window["wpshopifyComponents"] || []).push([["ProductPricing"],{

/***/ "./common/pricing/data.js":
/*!********************************!*\
  !*** ./common/pricing/data.js ***!
  \********************************/
/*! exports provided: getPrices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"getPrices\", function() { return getPrices; });\n/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/concat */ \"./node_modules/lodash/concat.js\");\n/* harmony import */ var lodash_concat__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_concat__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! lodash/compact */ \"./node_modules/lodash/compact.js\");\n/* harmony import */ var lodash_compact__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(lodash_compact__WEBPACK_IMPORTED_MODULE_1__);\n\n\n\nfunction sortAsc(a, b) {\n  return a - b;\n}\n\nfunction sortPricesAsc(prices) {\n  return prices.sort(sortAsc);\n}\n\nfunction convertToFloat(maybeString) {\n  return maybeString ? parseFloat(maybeString) : false;\n}\n\nfunction pricesArray(product, type) {\n  return lodash_compact__WEBPACK_IMPORTED_MODULE_1___default()(product.variants.reduce(function (acc, current) {\n    return lodash_concat__WEBPACK_IMPORTED_MODULE_0___default()(acc, convertToFloat(current[type]));\n  }, []));\n}\n\nfunction getPrices(product) {\n  var sort = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;\n\n  if (sort === 'asc') {\n    return {\n      regPrices: sortPricesAsc(pricesArray(product, 'price')),\n      compareAtPrices: sortPricesAsc(pricesArray(product, 'compareAtPrice'))\n    };\n  }\n\n  return {\n    regPrices: pricesArray(product, 'price'),\n    compareAtPrices: pricesArray(product, 'compareAtPrice')\n  };\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./common/pricing/data.js?");

/***/ }),

/***/ "./components/products/product/pricing/_state/context.js":
/*!***************************************************************!*\
  !*** ./components/products/product/pricing/_state/context.js ***!
  \***************************************************************/
/*! exports provided: ProductPricingContext */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingContext\", function() { return ProductPricingContext; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\nvar ProductPricingContext = react__WEBPACK_IMPORTED_MODULE_0___default.a.createContext();\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/_state/context.js?");

/***/ }),

/***/ "./components/products/product/pricing/_state/initial-state.js":
/*!*********************************************************************!*\
  !*** ./components/products/product/pricing/_state/initial-state.js ***!
  \*********************************************************************/
/*! exports provided: ProductPricingInitialState */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingInitialState\", function() { return ProductPricingInitialState; });\n/* harmony import */ var _common_pricing_data__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../common/pricing/data */ \"./common/pricing/data.js\");\n\n\nfunction ProductPricingInitialState(props) {\n  return {\n    prices: Object(_common_pricing_data__WEBPACK_IMPORTED_MODULE_0__[\"getPrices\"])(props.productState.payload),\n    showPriceRange: props.productsState.componentOptions.showPriceRange,\n    showCompareAt: props.productsState.componentOptions.showCompareAt\n  };\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/_state/initial-state.js?");

/***/ }),

/***/ "./components/products/product/pricing/_state/provider.jsx":
/*!*****************************************************************!*\
  !*** ./components/products/product/pricing/_state/provider.jsx ***!
  \*****************************************************************/
/*! exports provided: ProductPricingProvider */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingProvider\", function() { return ProductPricingProvider; });\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/extends */ \"./node_modules/@babel/runtime/helpers/extends.js\");\n/* harmony import */ var _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _reducer__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reducer */ \"./components/products/product/pricing/_state/reducer.js\");\n/* harmony import */ var _initial_state__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./initial-state */ \"./components/products/product/pricing/_state/initial-state.js\");\n/* harmony import */ var _context__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./context */ \"./components/products/product/pricing/_state/context.js\");\n\n\n\n\n\n\n\nfunction ProductPricingProvider(props) {\n  var _React$useReducer = react__WEBPACK_IMPORTED_MODULE_2___default.a.useReducer(_reducer__WEBPACK_IMPORTED_MODULE_3__[\"ProductPricingReducer\"], Object(_initial_state__WEBPACK_IMPORTED_MODULE_4__[\"ProductPricingInitialState\"])(props)),\n      _React$useReducer2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_1___default()(_React$useReducer, 2),\n      state = _React$useReducer2[0],\n      dispatch = _React$useReducer2[1];\n\n  var value = react__WEBPACK_IMPORTED_MODULE_2___default.a.useMemo(function () {\n    return [state, dispatch];\n  }, [state]);\n  return react__WEBPACK_IMPORTED_MODULE_2___default.a.createElement(_context__WEBPACK_IMPORTED_MODULE_5__[\"ProductPricingContext\"].Provider, _babel_runtime_helpers_extends__WEBPACK_IMPORTED_MODULE_0___default()({\n    value: value\n  }, props));\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/_state/provider.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/_state/reducer.js":
/*!***************************************************************!*\
  !*** ./components/products/product/pricing/_state/reducer.js ***!
  \***************************************************************/
/*! exports provided: ProductPricingReducer */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingReducer\", function() { return ProductPricingReducer; });\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/defineProperty */ \"./node_modules/@babel/runtime/helpers/defineProperty.js\");\n/* harmony import */ var _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _babel_runtime_helpers_defineProperty__WEBPACK_IMPORTED_MODULE_0___default()(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction ProductPricingReducer(state, action) {\n  switch (action.type) {\n    case 'SET_PRICES':\n      {\n        return _objectSpread({}, state, {\n          prices: action.payload\n        });\n      }\n\n    default:\n      {\n        throw new Error(\"Unhandled action type: \".concat(action.type, \" in ProductPricingReducer\"));\n      }\n  }\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/_state/reducer.js?");

/***/ }),

/***/ "./components/products/product/pricing/from/index.jsx":
/*!************************************************************!*\
  !*** ./components/products/product/pricing/from/index.jsx ***!
  \************************************************************/
/*! exports provided: ProductPriceFrom */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPriceFrom\", function() { return ProductPriceFrom; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction ProductPriceFrom() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"small\", {\n    className: \"wps-product-from-price\"\n  }, \"From:\");\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/from/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/index.jsx":
/*!*******************************************************!*\
  !*** ./components/products/product/pricing/index.jsx ***!
  \*******************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_state/context */ \"./components/products/product/_state/context.js\");\n/* harmony import */ var _items_state_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../items/_state/context */ \"./components/items/_state/context.js\");\n/* harmony import */ var _prices__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./prices */ \"./components/products/product/pricing/prices/index.jsx\");\n/* harmony import */ var _state_provider__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./_state/provider */ \"./components/products/product/pricing/_state/provider.jsx\");\n/* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../common/hooks */ \"./common/hooks/index.js\");\n/* harmony import */ var _common_utils__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../common/utils */ \"./common/utils/index.js\");\n\n\n\n\n\n\n\n\n\nfunction ProductPricing() {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_items_state_context__WEBPACK_IMPORTED_MODULE_3__[\"ItemsContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 1),\n      itemsState = _useContext2[0];\n\n  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_2__[\"ProductContext\"]),\n      _useContext4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext3, 1),\n      productState = _useContext4[0];\n\n  return Object(_common_hooks__WEBPACK_IMPORTED_MODULE_6__[\"usePortal\"])(react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_state_provider__WEBPACK_IMPORTED_MODULE_5__[\"ProductPricingProvider\"], {\n    productsState: itemsState,\n    productState: productState\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_prices__WEBPACK_IMPORTED_MODULE_4__[\"ProductPrices\"], null)), Object(_common_utils__WEBPACK_IMPORTED_MODULE_7__[\"findPortalElement\"])(productState.element, itemsState.componentOptions.dropzoneProductPricing));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (ProductPricing);\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/price/index.jsx":
/*!*************************************************************!*\
  !*** ./components/products/product/pricing/price/index.jsx ***!
  \*************************************************************/
/*! exports provided: ProductPrice */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPrice\", function() { return ProductPrice; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _shop_state_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../shop/_state/context */ \"./components/shop/_state/context.js\");\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../_state/context */ \"./components/products/product/pricing/_state/context.js\");\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../_state/context */ \"./components/products/product/_state/context.js\");\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! lodash/isEmpty */ \"./node_modules/lodash/isEmpty.js\");\n/* harmony import */ var lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5__);\n/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! lodash/last */ \"./node_modules/lodash/last.js\");\n/* harmony import */ var lodash_last__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(lodash_last__WEBPACK_IMPORTED_MODULE_6__);\n/* harmony import */ var lodash_min__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! lodash/min */ \"./node_modules/lodash/min.js\");\n/* harmony import */ var lodash_min__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(lodash_min__WEBPACK_IMPORTED_MODULE_7__);\n/* harmony import */ var lodash_max__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! lodash/max */ \"./node_modules/lodash/max.js\");\n/* harmony import */ var lodash_max__WEBPACK_IMPORTED_MODULE_8___default = /*#__PURE__*/__webpack_require__.n(lodash_max__WEBPACK_IMPORTED_MODULE_8__);\n/* harmony import */ var _range__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../range */ \"./components/products/product/pricing/range/index.jsx\");\n/* harmony import */ var _single__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../single */ \"./components/products/product/pricing/single/index.jsx\");\n/* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../common/hooks */ \"./common/hooks/index.js\");\n/* harmony import */ var _common_animations__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../common/animations */ \"./common/animations/index.js\");\n\n\n\n\n\n\n\n\n\n\n\n\n\n\nfunction lastPrice(prices, type) {\n  if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(prices)) {\n    return 0;\n  }\n\n  return lodash_last__WEBPACK_IMPORTED_MODULE_6___default()(prices[type]);\n}\n\nfunction firstRegPrice(prices) {\n  if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(prices)) {\n    return 0;\n  }\n\n  return prices.regPrices[0];\n}\n\nfunction firstPriceCompareAt(prices) {\n  if (lodash_isEmpty__WEBPACK_IMPORTED_MODULE_5___default()(prices)) {\n    return 0;\n  }\n\n  return prices.compareAtPrices[0];\n}\n\nfunction lastRegPrice(prices) {\n  return lastPrice(prices, 'regPrices');\n}\n\nfunction lastPriceCompareAt(prices) {\n  return lastPrice(prices, 'compareAtPrices');\n}\n\nfunction ProductPrice(_ref) {\n  var compareAt = _ref.compareAt;\n\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_shop_state_context__WEBPACK_IMPORTED_MODULE_2__[\"ShopContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 1),\n      shopState = _useContext2[0];\n\n  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_4__[\"ProductContext\"]),\n      _useContext4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext3, 1),\n      productState = _useContext4[0];\n\n  var _useContext5 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_3__[\"ProductPricingContext\"]),\n      _useContext6 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext5, 1),\n      productPricingState = _useContext6[0];\n\n  var isFirstRender = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useRef\"])(true);\n  var singlePriceElement = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useRef\"])();\n\n  var _useState = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useState\"])(getFirstPrice()),\n      _useState2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useState, 2),\n      regPrice = _useState2[0],\n      setRegPrice = _useState2[1];\n\n  var isShowing = Object(_common_hooks__WEBPACK_IMPORTED_MODULE_11__[\"useAction\"])('show.product.pricing', true);\n  var animePulse = Object(_common_animations__WEBPACK_IMPORTED_MODULE_12__[\"useAnime\"])(_common_animations__WEBPACK_IMPORTED_MODULE_12__[\"pulse\"]);\n\n  function showingRange() {\n    return productPricingState.showPriceRange;\n  }\n\n  function isRegAndCompareSame() {\n    if (!showingRange() && compareAt) {\n      if (firstPriceCompareAt(productPricingState.prices) === firstRegPrice(productPricingState.prices)) {\n        return true;\n      }\n    }\n\n    return false;\n  }\n\n  function isFirstAndLastSame() {\n    if (getFirstPrice() === getLastPrice()) {\n      return true;\n    }\n\n    return false;\n  }\n\n  function getFirstPrice() {\n    if (compareAt) {\n      if (showingRange()) {\n        return lodash_min__WEBPACK_IMPORTED_MODULE_7___default()(productPricingState.prices.compareAtPrices);\n      } else {\n        return firstPriceCompareAt(productPricingState.prices);\n      }\n    } else {\n      if (showingRange()) {\n        return lodash_min__WEBPACK_IMPORTED_MODULE_7___default()(productPricingState.prices.regPrices);\n      } else {\n        return firstRegPrice(productPricingState.prices);\n      }\n    }\n  }\n\n  function getLastPrice() {\n    if (compareAt) {\n      if (showingRange()) {\n        return lodash_max__WEBPACK_IMPORTED_MODULE_8___default()(productPricingState.prices.compareAtPrices);\n      } else {\n        return lastPriceCompareAt(productPricingState.prices);\n      }\n    } else {\n      if (showingRange()) {\n        return lodash_max__WEBPACK_IMPORTED_MODULE_8___default()(productPricingState.prices.regPrices);\n      } else {\n        return lastRegPrice(productPricingState.prices);\n      }\n    }\n  }\n\n  Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useEffect\"])(function () {\n    if (isFirstRender.current) {\n      isFirstRender.current = false;\n      return;\n    }\n\n    if (productState.selectedVariant) {\n      setRegPrice(productState.selectedVariant.price);\n      animePulse(singlePriceElement.current);\n    }\n  }, [productState.selectedVariant]);\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, !isRegAndCompareSame() && isShowing && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"h3\", {\n    itemScope: true,\n    itemProp: \"offers\",\n    itemType: \"https://schema.org/Offer\",\n    className: \"wps-products-price wps-product-pricing wps-products-price-one\",\n    \"data-wps-is-showing-compare-at\": compareAt,\n    \"data-wps-is-ready\": shopState.isShopReady ? '1' : '0'\n  }, showingRange() && !productState.selectedVariant ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_range__WEBPACK_IMPORTED_MODULE_9__[\"ProductPricingRange\"], {\n    firstPrice: getFirstPrice(),\n    lastPrice: getLastPrice(),\n    isFirstAndLastSame: isFirstAndLastSame()\n  }) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_single__WEBPACK_IMPORTED_MODULE_10__[\"ProductPriceSingle\"], {\n    ref: singlePriceElement,\n    price: regPrice\n  })));\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/price/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/prices/index.jsx":
/*!**************************************************************!*\
  !*** ./components/products/product/pricing/prices/index.jsx ***!
  \**************************************************************/
/*! exports provided: ProductPrices */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPrices\", function() { return ProductPrices; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_state/context */ \"./components/products/product/pricing/_state/context.js\");\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../_state/context */ \"./components/products/product/_state/context.js\");\n/* harmony import */ var _price__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../price */ \"./components/products/product/pricing/price/index.jsx\");\n\n\n\n\n\n\nfunction ProductPrices() {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_2__[\"ProductPricingContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 2),\n      productPricingState = _useContext2[0],\n      productPricingDispatch = _useContext2[1];\n\n  var _useContext3 = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_3__[\"ProductContext\"]),\n      _useContext4 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext3, 1),\n      productState = _useContext4[0];\n\n  return productPricingState.showCompareAt && !productState.selectedVariant ? react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_1___default.a.Fragment, null, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_price__WEBPACK_IMPORTED_MODULE_4__[\"ProductPrice\"], {\n    compareAt: true,\n    prices: productPricingState.prices\n  }), react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_price__WEBPACK_IMPORTED_MODULE_4__[\"ProductPrice\"], {\n    compareAt: false,\n    prices: productPricingState.prices\n  })) : react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(_price__WEBPACK_IMPORTED_MODULE_4__[\"ProductPrice\"], {\n    compareAt: productState.selectedVariant ? false : productPricingState.showCompareAt,\n    prices: productPricingState.prices\n  });\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/prices/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/range/group/index.jsx":
/*!*******************************************************************!*\
  !*** ./components/products/product/pricing/range/group/index.jsx ***!
  \*******************************************************************/
/*! exports provided: ProductPricingRangeGroup */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingRangeGroup\", function() { return ProductPricingRangeGroup; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _single__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../single */ \"./components/products/product/pricing/single/index.jsx\");\n/* harmony import */ var _from__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../from */ \"./components/products/product/pricing/from/index.jsx\");\n/* harmony import */ var _separator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../separator */ \"./components/products/product/pricing/separator/index.jsx\");\n\n\n\n\n\nfunction ProductPricingRangeGroup(_ref) {\n  var firstPrice = _ref.firstPrice,\n      lastPrice = _ref.lastPrice;\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(react__WEBPACK_IMPORTED_MODULE_0___default.a.Fragment, null, firstPrice !== lastPrice && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_from__WEBPACK_IMPORTED_MODULE_2__[\"ProductPriceFrom\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_single__WEBPACK_IMPORTED_MODULE_1__[\"ProductPriceSingle\"], {\n    price: firstPrice\n  }), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_separator__WEBPACK_IMPORTED_MODULE_3__[\"ProductPricingSeparator\"], null), react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_single__WEBPACK_IMPORTED_MODULE_1__[\"ProductPriceSingle\"], {\n    price: lastPrice\n  }));\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/range/group/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/range/index.jsx":
/*!*************************************************************!*\
  !*** ./components/products/product/pricing/range/index.jsx ***!
  \*************************************************************/
/*! exports provided: ProductPricingRange */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingRange\", function() { return ProductPricingRange; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _single__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../single */ \"./components/products/product/pricing/single/index.jsx\");\n/* harmony import */ var _group__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./group */ \"./components/products/product/pricing/range/group/index.jsx\");\n\n\n\n\nfunction ProductPricingRange(_ref) {\n  var firstPrice = _ref.firstPrice,\n      lastPrice = _ref.lastPrice,\n      isFirstAndLastSame = _ref.isFirstAndLastSame;\n  return isFirstAndLastSame ? react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_single__WEBPACK_IMPORTED_MODULE_1__[\"ProductPriceSingle\"], {\n    price: firstPrice\n  }) : react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_group__WEBPACK_IMPORTED_MODULE_2__[\"ProductPricingRangeGroup\"], {\n    firstPrice: firstPrice,\n    lastPrice: lastPrice\n  });\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/range/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/separator/index.jsx":
/*!*****************************************************************!*\
  !*** ./components/products/product/pricing/separator/index.jsx ***!
  \*****************************************************************/
/*! exports provided: ProductPricingSeparator */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPricingSeparator\", function() { return ProductPricingSeparator; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n\n\nfunction ProductPricingSeparator() {\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"span\", {\n    className: \"wps-product-from-price-separator\"\n  }, \"\\u2013\");\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/separator/index.jsx?");

/***/ }),

/***/ "./components/products/product/pricing/single/index.jsx":
/*!**************************************************************!*\
  !*** ./components/products/product/pricing/single/index.jsx ***!
  \**************************************************************/
/*! exports provided: ProductPriceSingle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"ProductPriceSingle\", function() { return ProductPriceSingle; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _common_pricing_formatting__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../common/pricing/formatting */ \"./common/pricing/formatting.js\");\n/* harmony import */ var _shop_state_context__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../shop/_state/context */ \"./components/shop/_state/context.js\");\n\n\n\n\nvar ProductPriceSingle = react__WEBPACK_IMPORTED_MODULE_1___default.a.forwardRef(function (props, ref) {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_shop_state_context__WEBPACK_IMPORTED_MODULE_3__[\"ShopContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 1),\n      shopState = _useContext2[0];\n\n  return props.price && react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"span\", {\n    ref: ref,\n    className: \"wps-product-individual-price\"\n  }, shopState.isShopReady && Object(_common_pricing_formatting__WEBPACK_IMPORTED_MODULE_2__[\"formatPriceToCurrency\"])(props.price, shopState.info.currencyCode));\n});\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/products/product/pricing/single/index.jsx?");

/***/ }),

/***/ "./node_modules/lodash/_baseExtremum.js":
/*!**********************************************!*\
  !*** ./node_modules/lodash/_baseExtremum.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var isSymbol = __webpack_require__(/*! ./isSymbol */ \"./node_modules/lodash/isSymbol.js\");\n\n/**\n * The base implementation of methods like `_.max` and `_.min` which accepts a\n * `comparator` to determine the extremum value.\n *\n * @private\n * @param {Array} array The array to iterate over.\n * @param {Function} iteratee The iteratee invoked per iteration.\n * @param {Function} comparator The comparator used to compare values.\n * @returns {*} Returns the extremum value.\n */\nfunction baseExtremum(array, iteratee, comparator) {\n  var index = -1,\n      length = array.length;\n\n  while (++index < length) {\n    var value = array[index],\n        current = iteratee(value);\n\n    if (current != null && (computed === undefined\n          ? (current === current && !isSymbol(current))\n          : comparator(current, computed)\n        )) {\n      var computed = current,\n          result = value;\n    }\n  }\n  return result;\n}\n\nmodule.exports = baseExtremum;\n\n\n//# sourceURL=webpack://wpshopifyComponents/./node_modules/lodash/_baseExtremum.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseGt.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_baseGt.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.gt` which doesn't coerce arguments.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if `value` is greater than `other`,\n *  else `false`.\n */\nfunction baseGt(value, other) {\n  return value > other;\n}\n\nmodule.exports = baseGt;\n\n\n//# sourceURL=webpack://wpshopifyComponents/./node_modules/lodash/_baseGt.js?");

/***/ }),

/***/ "./node_modules/lodash/_baseLt.js":
/*!****************************************!*\
  !*** ./node_modules/lodash/_baseLt.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("/**\n * The base implementation of `_.lt` which doesn't coerce arguments.\n *\n * @private\n * @param {*} value The value to compare.\n * @param {*} other The other value to compare.\n * @returns {boolean} Returns `true` if `value` is less than `other`,\n *  else `false`.\n */\nfunction baseLt(value, other) {\n  return value < other;\n}\n\nmodule.exports = baseLt;\n\n\n//# sourceURL=webpack://wpshopifyComponents/./node_modules/lodash/_baseLt.js?");

/***/ }),

/***/ "./node_modules/lodash/max.js":
/*!************************************!*\
  !*** ./node_modules/lodash/max.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseExtremum = __webpack_require__(/*! ./_baseExtremum */ \"./node_modules/lodash/_baseExtremum.js\"),\n    baseGt = __webpack_require__(/*! ./_baseGt */ \"./node_modules/lodash/_baseGt.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * Computes the maximum value of `array`. If `array` is empty or falsey,\n * `undefined` is returned.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Math\n * @param {Array} array The array to iterate over.\n * @returns {*} Returns the maximum value.\n * @example\n *\n * _.max([4, 2, 8, 6]);\n * // => 8\n *\n * _.max([]);\n * // => undefined\n */\nfunction max(array) {\n  return (array && array.length)\n    ? baseExtremum(array, identity, baseGt)\n    : undefined;\n}\n\nmodule.exports = max;\n\n\n//# sourceURL=webpack://wpshopifyComponents/./node_modules/lodash/max.js?");

/***/ }),

/***/ "./node_modules/lodash/min.js":
/*!************************************!*\
  !*** ./node_modules/lodash/min.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("var baseExtremum = __webpack_require__(/*! ./_baseExtremum */ \"./node_modules/lodash/_baseExtremum.js\"),\n    baseLt = __webpack_require__(/*! ./_baseLt */ \"./node_modules/lodash/_baseLt.js\"),\n    identity = __webpack_require__(/*! ./identity */ \"./node_modules/lodash/identity.js\");\n\n/**\n * Computes the minimum value of `array`. If `array` is empty or falsey,\n * `undefined` is returned.\n *\n * @static\n * @since 0.1.0\n * @memberOf _\n * @category Math\n * @param {Array} array The array to iterate over.\n * @returns {*} Returns the minimum value.\n * @example\n *\n * _.min([4, 2, 8, 6]);\n * // => 2\n *\n * _.min([]);\n * // => undefined\n */\nfunction min(array) {\n  return (array && array.length)\n    ? baseExtremum(array, identity, baseLt)\n    : undefined;\n}\n\nmodule.exports = min;\n\n\n//# sourceURL=webpack://wpshopifyComponents/./node_modules/lodash/min.js?");

/***/ })

}]);