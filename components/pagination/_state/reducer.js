import update from 'immutability-helper'

function PaginationReducer(state, action) {
   switch (action.type) {
      case 'SET_CONTROLS_TOUCHED': {
         return {
            ...state,
            controlsTouched: update(state.controlsTouched, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in PaginationReducer`)
      }
   }
}

export { PaginationReducer }
