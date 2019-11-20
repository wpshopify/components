import update from "immutability-helper"
import some from "lodash/some"
import concat from "lodash/concat"
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

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ShopReducer`)
    }
  }
}

export { ShopReducer }
