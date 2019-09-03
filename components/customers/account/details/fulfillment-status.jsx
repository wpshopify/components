import React from 'react'
import isEmpty from 'lodash/isEmpty'

function FulfillmentStatus({ order }) {
   return isEmpty(order.successfulFulfillments) ? 'Unfulfilled' : 'Fulfilled'
}

export { FulfillmentStatus }
