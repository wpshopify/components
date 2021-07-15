import { CartLineItem } from '../lineitem'

function CartLineItems({ lineItems, inventory }) {

  console.log('lineItems', lineItems);
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
