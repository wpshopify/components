import update from 'immutability-helper';

function StorefrontReducer(state, action) {
  switch (action.type) {
    case 'CLEAR_SELECTIONS': {
      return {
        ...state,
        selections: update(state.selections, { $set: {} }),
      };
    }

    case 'CLEAR_SELECTED_VENDORS': {
      return {
        ...state,
        selectedVendors: update(state.selectedVendors, { $set: [] }),
      };
    }

    case 'CLEAR_SELECTED_TAGS': {
      return {
        ...state,
        selectedTags: update(state.selectedTags, { $set: [] }),
      };
    }

    case 'CLEAR_SELECTED_TYPES': {
      return {
        ...state,
        selectedTypes: update(state.selectedTypes, { $set: [] }),
      };
    }

    case 'SET_SELECTIONS': {
      if (!action.payload) {
        return state;
      }

      return {
        ...state,
        selections: update(state.selections, { $merge: action.payload }),
      };
    }

    // Is called dynamically
    case 'SET_SELECTED_TAGS': {
      return {
        ...state,
        selectedTags: update(state.selectedTags, { $set: action.payload }),
      };
    }

    // Is called dynamically
    case 'SET_SELECTED_TYPES': {
      return {
        ...state,
        selectedTypes: update(state.selectedTypes, { $set: action.payload }),
      };
    }

    // Is called dynamically
    case 'SET_SELECTED_VENDORS': {
      return {
        ...state,
        selectedVendors: update(state.selectedVendors, { $set: action.payload }),
      };
    }

    // Is called dynamically
    case 'SET_SELECTED_AVAILABLE_FOR_SALE': {
      if (!action.payload) {
        var newVal = null;
      } else {
        var newVal = action.payload;
      }

      return {
        ...state,
        selectedAvailableForSale: update(state.selectedAvailableForSale, { $set: newVal }),
      };
    }

    default: {
      throw new Error(`Unhandled action type: ${action.type} in StorefrontReducer`);
    }
  }
}

export { StorefrontReducer };
