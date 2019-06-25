import React from 'react'
import { CartLineItem } from '../lineitem'

function CartLineItems({ lineItems }) {
   return <>{lineItems && lineItems.map((lineItem, index) => <CartLineItem key={lineItem.id} lineItem={lineItem} index={index} />)}</>
}

export { CartLineItems }
