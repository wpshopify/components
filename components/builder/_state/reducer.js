import update from "immutability-helper"
import isEmpty from "lodash/isEmpty"
import some from "lodash/some"
import concat from "lodash/concat"
import assign from "lodash/assign"
import {
  BuilderInitialState,
  getDefaultSettings,
  getDefaultProductOptions,
  getSettings
} from "./initial-state"

function BuilderReducer(state, action) {
  switch (action.type) {
    case "SET_IS_READY": {
      return {
        ...state,
        isReady: update(state.isReady, { $set: action.payload }),
        isShopReady: update(state.isShopReady, { $set: action.payload })
      }
    }

    case "SET_IS_LOADING": {
      return {
        ...state,
        isLoading: update(state.isLoading, { $set: action.payload })
      }
    }

    case "SET_SHORTCODE": {
      return {
        ...state,
        shortcode: update(state.shortcodeValue, { $set: action.payload })
      }
    }

    case "SET_CUSTOM_CONNECTION": {
      return {
        ...state,
        hasCustomConnection: update(state.hasCustomConnection, {
          $set: action.payload
        })
      }
    }

    case "RESET_SETTINGS": {
      localStorage.removeItem("wps-cached-settings")

      return {
        ...state,
        defaultSettings: update(state.defaultSettings, {
          $set: getDefaultSettings()
        }),
        productOptions: update(state.productOptions, {
          $set: getDefaultProductOptions(state.payload)
        }),
        settings: update(state.settings, {
          $set: getSettings()
        })
      }
    }

    case "UPDATE_NOTICES": {
      let updatedNotices = state.notices

      if (!isEmpty(action.payload)) {
        if (!some(state.notices, action.payload)) {
          updatedNotices = concat(state.notices, [action.payload])
        } else {
          updatedNotices = state.notices
        }
      }

      return {
        ...state,
        notices: update(state.notices, { $set: updatedNotices })
      }
    }

    case "SET_NOTICES": {
      return {
        ...state,
        notices: update(state.notices, { $set: action.payload })
      }
    }

    case "UPDATE_SETTING":
      const newSettings = state.settings

      newSettings[action.payload.key] = update(state[action.payload.key], {
        $set: action.payload.value
      })

      var newProductOptions = state.productOptions[0]

      // newProductOptions.componentOptions[action.payload.key] = action.payload.value

      newProductOptions.componentOptions = update(
        state.productOptions[0].componentOptions,
        { $set: newSettings }
      )

      localStorage.setItem("wps-cached-settings", JSON.stringify(newSettings))

      return {
        ...state,
        settings: newSettings,
        productOptions: [newProductOptions]
      }

    case "SET_PAYLOAD":
      var newProductOptions = state.productOptions[0]

      var newpayload = update(newProductOptions.componentPayload, {
        $set: action.payload
      })

      newProductOptions.componentPayload = newpayload

      return {
        ...state,
        payload: update(state.payload, { $set: action.payload }),
        productOptions: [newProductOptions]
      }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in BuilderReducer`)
    }
  }
}

export { BuilderReducer }
