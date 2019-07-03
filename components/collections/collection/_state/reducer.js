import update from 'immutability-helper'

function CollectionReducer(state, action) {
   switch (action.type) {
      case 'UPDATE_PRODUCTS': {
         console.log('1')

         if (!action.payload) {
            console.log('2')
            return {
               ...state
            }
         }
         console.log('3')

         // if (limitReached(state)) {
         //    console.log('4')
         //    if (state.limit) {
         //       var updatedPayload = update(state.payload, { $set: state.payload.concat(action.payload).slice(0, state.limit) })
         //    } else {
         //       var updatedPayload = state.payload
         //    }
         //    console.log('5')
         // } else {
         //    console.log('6')
         //    var updatedPayload = update(state.payload, { $push: action.payload })
         // }

         var updatedPayload = update(state.productOptions[0].componentPayload, { $push: action.payload })
         console.log('7 1 .............', updatedPayload)

         console.log('7 2 .............', state.productOptions)

         var okoko = update(state.productOptions[0].componentPayload, { $set: updatedPayload })

         console.log('okoko', okoko)

         state.productOptions[0].componentPayload = updatedPayload

         console.log('state.productOptions', state.productOptions)

         return {
            ...state,
            productOptions: state.productOptions
         }
      }

      case 'SET_PRODUCT_OPTIONS': {
         if (!action.payload) {
            return {
               ...state
            }
         }

         return {
            ...state,
            productOptions: update(state.productOptions, { $set: action.payload })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in CollectionReducer`)
      }
   }
}

export { CollectionReducer }
