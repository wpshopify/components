import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'

function hasNextPage(payload) {
   if (isEmpty(payload)) {
      return false
   }

   return last(payload).hasNextPage
}

function limitReached(state) {
   if (!state.limit) {
      return false
   }

   return state.totalShown >= state.limit
}

function ItemsReducer(state, action) {
   switch (action.type) {
      case 'UPDATE_PAYLOAD': {
         if (!hasNextPage(action.payload) || limitReached(state)) {
            console.log('UPDATE_PAYLOAD ....... limit or final page reached')

            var updatedHasMoreItems = update(state.hasMoreItems, { $set: false })

            if (state.limit) {
               console.log('HAS LIMIT HERREEE')
               console.log('state.payload.concat(action.payload)', state.payload.concat(action.payload))

               var updatedPayload = update(state.payload, { $set: state.payload.concat(action.payload).slice(0, state.limit) })
               console.log('updatedPayload', updatedPayload)

               console.log('action.payload', action.payload)
            } else {
               var updatedPayload = state.payload
            }
         } else {
            console.log('UPDATE_PAYLOAD ....... just updating', action.payload)
            var updatedPayload = update(state.payload, { $push: action.payload })
            var updatedHasMoreItems = update(state.hasMoreItems, { $set: true })
         }

         console.log('state.totalShown', state.totalShown)
         console.log('action.payload.length', action.payload.length)

         console.log('updatedHasMoreItems', updatedHasMoreItems)
         console.log('updatedPayload', updatedPayload)

         return {
            ...state,
            payload: updatedPayload,
            hasMoreItems: updatedHasMoreItems
         }
      }
      case 'SET_PAYLOAD': {
         return {
            ...state,
            payload: update(state.payload, { $set: action.payload })
         }
      }

      case 'LIMIT_PAYLOAD': {
         return {
            ...state,
            payload: update(state.payload, { $set: state.payload.slice(0, action.payload) })
         }
      }

      case 'SET_IS_LOADING': {
         return {
            ...state,
            isLoading: update(state.isLoading, { $set: action.payload })
         }
      }

      case 'SET_TOTAL_SHOWN': {
         return {
            ...state,
            totalShown: update(state.totalShown, { $set: action.payload + state.totalShown })
         }
      }

      case 'SET_QUERY_PARAMS': {
         return {
            ...state,
            queryParams: update(state.queryParams, { $merge: action.payload })
         }
      }

      default: {
         return state
      }
   }
}

export { ItemsReducer }
