(window["wpshopifyComponents"] = window["wpshopifyComponents"] || []).push([["CartHeader"],{

/***/ "./components/cart/close/index.jsx":
/*!*****************************************!*\
  !*** ./components/cart/close/index.jsx ***!
  \*****************************************/
/*! exports provided: CartClose */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CartClose\", function() { return CartClose; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_state/context */ \"./components/cart/_state/context.js\");\n\n\n\n\nfunction CartClose() {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_2__[\"CartContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 2),\n      cartState = _useContext2[0],\n      cartDispatch = _useContext2[1];\n\n  function onClose(e) {\n    cartDispatch({\n      type: 'TOGGLE_CART',\n      payload: false\n    });\n  }\n\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"button\", {\n    className: \"wps-btn-close wps-modal-close-trigger\",\n    title: \"Close Cart\",\n    onClick: onClose\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"span\", {\n    className: \"wps-modal-close-trigger\"\n  }, \"\\xD7\"));\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/cart/close/index.jsx?");

/***/ }),

/***/ "./components/cart/header/index.jsx":
/*!******************************************!*\
  !*** ./components/cart/header/index.jsx ***!
  \******************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _title__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../title */ \"./components/cart/title/index.jsx\");\n/* harmony import */ var _close__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../close */ \"./components/cart/close/index.jsx\");\n/* harmony import */ var _common_hooks__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../common/hooks */ \"./common/hooks/index.js\");\n\n\n\n\n\nfunction CartHeader() {\n  var isShowingTitle = Object(_common_hooks__WEBPACK_IMPORTED_MODULE_3__[\"useAction\"])('show.cart.title', true);\n  var isShowingClose = Object(_common_hooks__WEBPACK_IMPORTED_MODULE_3__[\"useAction\"])('show.cart.close', true);\n  return react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"section\", {\n    className: \"wps-cart-header container-fluid\"\n  }, react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(\"div\", {\n    className: \"row\"\n  }, isShowingTitle && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_title__WEBPACK_IMPORTED_MODULE_1__[\"CartTitle\"], null), isShowingClose && react__WEBPACK_IMPORTED_MODULE_0___default.a.createElement(_close__WEBPACK_IMPORTED_MODULE_2__[\"CartClose\"], null)));\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (CartHeader);\n\n//# sourceURL=webpack://wpshopifyComponents/./components/cart/header/index.jsx?");

/***/ }),

/***/ "./components/cart/title/index.jsx":
/*!*****************************************!*\
  !*** ./components/cart/title/index.jsx ***!
  \*****************************************/
/*! exports provided: CartTitle */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"CartTitle\", function() { return CartTitle; });\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @babel/runtime/helpers/slicedToArray */ \"./node_modules/@babel/runtime/helpers/slicedToArray.js\");\n/* harmony import */ var _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _state_context__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../_state/context */ \"./components/cart/_state/context.js\");\n\n\n\n\nfunction CartTitle() {\n  var _useContext = Object(react__WEBPACK_IMPORTED_MODULE_1__[\"useContext\"])(_state_context__WEBPACK_IMPORTED_MODULE_2__[\"CartContext\"]),\n      _useContext2 = _babel_runtime_helpers_slicedToArray__WEBPACK_IMPORTED_MODULE_0___default()(_useContext, 1),\n      cartState = _useContext2[0];\n\n  return react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"div\", {\n    className: \"wps-col-8 wps-p-0\"\n  }, react__WEBPACK_IMPORTED_MODULE_1___default.a.createElement(\"h2\", {\n    className: \"wps-cart-title\"\n  }, cartState.title));\n}\n\n\n\n//# sourceURL=webpack://wpshopifyComponents/./components/cart/title/index.jsx?");

/***/ })

}]);