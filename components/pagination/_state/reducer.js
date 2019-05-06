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
         return state
      }
   }
}

export { PaginationReducer }
