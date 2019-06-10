import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import some from 'lodash/some'
import concat from 'lodash/concat'

function CartReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_CHECKING_OUT':
         return {
            ...state,
            isCheckingOut: update(state.isCheckingOut, { $set: action.payload })
         }
      case 'SET_TERMS_ACCEPTED':
         return {
            ...state,
            termsAccepted: update(state.termsAccepted, { $set: action.payload })
         }
      case 'UPDATE_NOTICES': {
         let updatedNotices = state.notices

         if (isEmpty(action.payload)) {
            updatedNotices = action.payload
         } else {
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
      default: {
         throw new Error(`Unhandled action type: ${action.type} in CartReducer`)
      }
   }
}

export { CartReducer }
