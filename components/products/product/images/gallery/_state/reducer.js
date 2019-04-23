function ProductGalleryReducer(state, action) {
   switch (action.type) {
      case 'SET_FEAT_IMAGE': {
         return {
            ...state,
            featImage: action.payload
         }
      }

      case 'SET_FEAT_IMAGE_ELEMENT': {
         return {
            ...state,
            featImageElement: action.payload
         }
      }

      default: {
         return state
      }
   }
}

export { ProductGalleryReducer }
