import update from "immutability-helper"
import some from "lodash/some"
import concat from "lodash/concat"
import uniqWith from "lodash/uniqWith"
import isEqual from "lodash/isEqual"
import isEmpty from "lodash/isEmpty"
import { hasHooks } from "../../../common/utils"

function ShopReducer(state, action) {
  switch (action.type) {
    case "SET_CHECKOUT_ID": {
      return {
        ...state,
        checkoutId: update(state.checkoutId, { $set: action.payload })
      }
    }
    case "SET_SHOP_INFO": {
      return {
        ...state,
        info: update(state.info, { $set: action.payload })
      }
    }
    case "SET_HOOKS_COMPATIBLE": {
      return {
        ...state,
        hooksCompatible: update(state.hooksCompatible, { $set: action.payload })
      }
    }
    case "IS_SHOP_READY": {
      const newState = {
        ...state,
        isShopReady: update(state.isShopReady, {
          $set: true
        })
      }

      // App is ready to go
      hasHooks() && wp.hooks.doAction("after.ready", newState.settings) // legacy
      hasHooks() && wp.hooks.doAction("after.shop.ready", newState)

      return newState
    }

    case "IS_CART_READY": {
      const newState = {
        ...state,
        isCartReady: update(state.isCartReady, {
          $set: true
        })
      }

      // Cart is ready to go
      hasHooks() && wp.hooks.doAction("after.cart.ready", newState)

      return newState
    }

    case "UPDATE_NOTICES": {
      let updatedNotices = state.notices

      if (!some(state.notices, action.payload)) {
        updatedNotices = concat(state.notices, [action.payload])
      } else {
        updatedNotices = state.notices
      }

      return {
        ...state,
        notices: update(state.notices, { $set: updatedNotices })
      }
    }

    case "SET_CHECKOUT_DISCOUNT_CODE": {
      return {
        ...state,
        discountCode: update(state.discountCode, { $set: action.payload })
      }
    }

    case "UPDATE_CHECKOUT_ATTRIBUTES": {
      let attributes = uniqWith(
        concat(state.customAttributes, [action.payload]),
        isEqual
      )

      return {
        ...state,
        customAttributes: update(state.customAttributes, { $set: attributes })
      }
    }

    case "SET_CHECKOUT_ATTRIBUTES": {
       
      if (isEmpty(action.payload)) {
        var newCheckoutAttributes = []
      } else {
        var newCheckoutAttributes = [action.payload]
      }

      return {
        ...state,
        customAttributes: update(state.customAttributes, {
          $set: newCheckoutAttributes
        })
      }
    }

    case "SET_CHECKOUT_NOTE": {
      hasHooks() && wp.hooks.doAction("on.checkout.note", action.payload)

      return {
        ...state,
        note: update(state.note, { $set: action.payload })
      }
    }

    case "SET_DIRECT_CHECKOUT_OCCURING": {

      return {
        ...state,
        isDirctCheckoutOccuring: update(state.isDirctCheckoutOccuring, { $set: action.payload })
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ShopReducer`)
    }
  }
}

export { ShopReducer }
