import update from 'immutability-helper'
import isEmpty from 'lodash/isEmpty'
import last from 'lodash/last'
import some from 'lodash/some'
import concat from 'lodash/concat'

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

function hasMorePages(state, newItemTotal) {
   return newItemTotal >= state.queryParams.first
}

function ItemsReducer(state, action) {
   switch (action.type) {
      case 'UPDATE_PAYLOAD': {
         if (!action.payload) {
            return {
               ...state
            }
         }

         var updatedHasMoreItems = true

         if (limitReached(state)) {
            if (state.limit) {
               var updatedPayload = update(state.payload, { $set: state.payload.concat(action.payload).slice(0, state.limit) })
            } else {
               var updatedPayload = state.payload
            }

            updatedHasMoreItems = update(state.hasMoreItems, { $set: false })
         } else {
            var updatedPayload = update(state.payload, { $push: action.payload })

            if (!hasNextPage(action.payload)) {
               updatedHasMoreItems = update(state.hasMoreItems, { $set: false })
            }
         }

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

      case 'UPDATE_HAS_MORE_ITEMS': {
         return {
            ...state,
            hasMoreItems: update(state.hasMoreItems, { $set: hasMorePages(state, action.payload) })
         }
      }

      case 'UPDATE_PAYLOAD_CACHE': {
         return {
            ...state,
            payloadCache: update(state.payloadCache, { $merge: action.payload })
         }
      }

      case 'UPDATE_NOTICES': {
         let updatedNotices = state.notices

         if (isEmpty(action.payload)) {
            updatedNotices = action.payload
         } else {
            if (!some(state.notices, action.payload)) {
               updatedNotices = concat(state.notices, [action.payload])
            } else {
               updatedNotices = state.notices
            }
         }

         return {
            ...state,
            notices: update(state.notices, { $set: updatedNotices })
         }
      }

      default: {
         throw new Error(`Unhandled action type: ${action.type} in ItemsReducer`)
      }
   }
}

export { ItemsReducer }
