import { CartContext } from '../_state/context'

const { useContext } = wp.element
const { __ } = wp.i18n

function CartTitle() {
  const [cartState] = useContext(CartContext)

  return (
    <div className='wps-col-8 wps-p-0'>
      <h2 className='wps-cart-title'>
        {wp.hooks.applyFilters('cart.title.text', __(cartState.title, wpshopify.misc.textdomain))}
      </h2>
    </div>
  )
}

export { CartTitle }
