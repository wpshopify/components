import update from 'immutability-helper'
import { updateNoticesState } from '../../../common/state'

function ShopReducer(state, action) {
  switch (action.type) {
    case 'UPDATE_NOTICES': {
      return {
        ...state,
        notices: updateNoticesState(state.notices, action.payload),
      }
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in ShopReducer`)
    }
  }
}

export { ShopReducer }
