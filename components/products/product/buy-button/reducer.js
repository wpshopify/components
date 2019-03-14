import { filterAvailableVariantsBySelectedOption } from '../../../../common/products';
import update from 'immutability-helper';


function ProductBuyButtonReducer(state, action) {

   switch (action.type) {

      case "SET_ALL_SELECTED_OPTIONS":

         return {
            ...state,
            allOptionsSelected: action.payload
         }

      case "UNSET_SELECTED_OPTIONS":

         // action.payload === option.name
         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $unset: [action.payload] })
         }

      case "UPDATE_SELECTED_OPTIONS":

         console.log('PRIOR UPDATE_SELECTED_OPTIONS', state.selectedOptions);
         console.log('setting action.payload ', action.payload);

         // action.payload === {Color: "Red"}
         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $merge: action.payload })
         }

      case "REMOVE_SELECTED_OPTIONS":

         return {
            ...state,
            selectedOptions: update(state.selectedOptions, { $set: {} })
         }

      case "SET_MISSING_SELECTIONS":

         return {
            ...state,
            missingSelections: action.payload
         }

      case "SET_AVAILABLE_VARIANTS":

         // action.payload === selectedOption
         return {
            ...state,
            availableVariants: filterAvailableVariantsBySelectedOption(state.product, action.payload)
         }

      case "SET_IS_ADDING_TO_CART":

         return {
            ...state,
            isAdding: action.payload
         }

      case "UPDATE_QUANTITY":
         // action.payload === new quantity
         return {
            ...state,
            quantity: action.payload
         }

      default:
         return state;

   }

}

export {
   ProductBuyButtonReducer
}