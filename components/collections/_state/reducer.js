function CollectionsReducer(state, action) {
  switch (action.type) {
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
