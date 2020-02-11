import { CartContext } from '../_state/context'

const { useContext } = wp.element

function CartTitle() {
  const [cartState] = useContext(CartContext)

  return (
    <div className='wps-col-8 wps-p-0'>
      <h2 className='wps-cart-title'>{cartState.title}</h2>
    </div>
  )
}

export { CartTitle }
