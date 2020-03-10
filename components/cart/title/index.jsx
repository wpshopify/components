import { CartContext } from '../_state/context'
import { FilterHook } from '../../../common/utils'

const { useContext } = wp.element
const { __ } = wp.i18n

function CartTitle() {
  const [cartState] = useContext(CartContext)

  return (
    <div className='wps-col-8 wps-p-0'>
      <FilterHook name='before.cart.title' hasHTML={true} args={[cartState]} />

      <h2 className='wps-cart-title'>
        <FilterHook name='cart.title.text'>
          {__(cartState.title, wpshopify.misc.textdomain)}
        </FilterHook>
      </h2>

      <FilterHook name='after.cart.title' hasHTML={true} args={[cartState]} />
    </div>
  )
}

export { CartTitle }
