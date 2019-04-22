import update from 'immutability-helper'

function ProductsReducer(state, action) {
   switch (action.type) {
      case 'UPDATE_PAYLOAD': {
         return {
            ...state,
            payload: update(state.payload, { $push: action.payload })
         }
      }
      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: action.payload
         }
      }
      default: {
         return state
      }
   }
}

export { ProductsReducer }
