import update from 'immutability-helper'

function PaginationReducer(state, action) {
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
            isLoading: update(state.isLoading, { $set: action.payload })
         }
      }
      case 'SET_PAYLOAD': {
         return {
            ...state,
            payload: update(state.payload, { $set: action.payload })
         }
      }
      case 'SET_QUERY_PARAMS': {
         return {
            ...state,
            queryParams: update(state.queryParams, { $merge: action.payload })
         }
      }

      case 'SET_TOTAL_SHOWN': {
         return {
            ...state,
            totalShown: update(state.totalShown, { $set: action.payload + state.totalShown })
         }
      }

      case 'SET_HAS_MORE_ITEMS': {
         return {
            ...state,
            hasMoreItems: update(state.hasMoreItems, { $set: action.payload })
         }
      }

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
