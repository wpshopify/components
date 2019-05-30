import update from 'immutability-helper'

function ProductGalleryReducer(state, action) {
   switch (action.type) {
      case 'SET_FEAT_IMAGE': {
         return {
            ...state,
            featImage: update(state.featImage, { $set: action.payload })
         }
      }

      case 'SET_FEAT_IMAGE_ELEMENT': {
         return {
            ...state,
            featImageElement: update(state.featImageElement, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ProductGalleryReducer`)
      }
   }
}

export { ProductGalleryReducer }
