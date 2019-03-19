function ProductGalleryReducer(state, action) {
   switch (action.type) {
      case "SET_FEAT_IMAGE_ORIGINAL": {
         return {
            ...state,
            featImageOriginal: action.payload
         };
      }

      case "SET_FEAT_IMAGE_OPTIMIZED": {
         return {
            ...state,
            featImageOptimized: action.payload
         };
      }

      default: {
         return state;
      }
   }
}

export { ProductGalleryReducer };
