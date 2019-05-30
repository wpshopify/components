import update from 'immutability-helper'

function CollectionsReducer(state, action) {
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
         throw new Error(`Unhandled action type: ${action.type} in CollectionsReducer`)
      }
   }
}

export { CollectionsReducer }
