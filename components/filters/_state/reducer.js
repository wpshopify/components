import update from 'immutability-helper'

function FiltersReducer(state, action) {
   switch (action.type) {
      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: update(state.isLoading, { $set: action.payload })
         }
      }

      case 'CLEAR_SELECTIONS': {
         return {
            ...state,
            selections: update(state.selections, { $set: {} })
         }
      }

      case 'CLEAR_SELECTED_VENDORS': {
         return {
            ...state,
            selectedVendors: update(state.selectedVendors, { $set: [] })
         }
      }

      case 'CLEAR_SELECTED_TAGS': {
         return {
            ...state,
            selectedTags: update(state.selectedTags, { $set: [] })
         }
      }

      case 'CLEAR_SELECTED_TYPES': {
         return {
            ...state,
            selectedTypes: update(state.selectedTypes, { $set: [] })
         }
      }

      case 'SET_SELECTIONS': {
         if (!action.payload) {
            return state
         }

         return {
            ...state,
            selections: update(state.selections, { $merge: action.payload })
         }
      }

      case 'SET_PAYLOAD': {
         return {
            ...state,
            payload: update(state.payload, { $set: action.payload })
         }
      }

      case 'SET_FILTER_PARAMS': {
         return {
            ...state,
            filterParams: update(state.filterParams, { $merge: action.payload })
         }
      }

      case 'SET_RESULTS': {
         return {
            ...state,
            results: update(state.results, { $set: action.payload })
         }
      }

      case 'SET_HAS_RESULTS': {
         return {
            ...state,
            hasResults: update(state.hasResults, { $set: action.payload })
         }
      }

      case 'SET_HAS_NEXT_PAGE': {
         return {
            ...state,
            hasNextPage: update(state.hasNextPage, { $set: action.payload })
         }
      }

      case 'SET_HAS_PREV_PAGE': {
         return {
            ...state,
            hasPrevPage: update(state.hasPrevPage, { $set: action.payload })
         }
      }

      case 'SET_SELECTED_TAGS': {
         return {
            ...state,
            selectedTags: update(state.selectedTags, { $set: action.payload })
         }
      }

      case 'SET_SELECTED_TYPES': {
         return {
            ...state,
            selectedTypes: update(state.selectedTypes, { $set: action.payload })
         }
      }

      case 'SET_SELECTED_VENDORS': {
         return {
            ...state,
            selectedVendors: update(state.selectedVendors, { $set: action.payload })
         }
      }

      default: {
         return state
      }
   }
}

export { FiltersReducer }
