import { CartLineItem } from '../lineitem'

function CartLineItems({ lineItems, inventory }) {
  return (
    <>
      {lineItems &&
        lineItems.map((lineItem, index) => (
          <CartLineItem key={lineItem.id} lineItem={lineItem} index={index} inventory={inventory} />
        ))}
    </>
  )
}

export { CartLineItems }
