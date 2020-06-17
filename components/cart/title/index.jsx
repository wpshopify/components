import { FilterHook } from '../../../common/utils'

function CartTitle({ cartState }) {
  return (
    <div className='wps-col-8'>
      <FilterHook name='before.cart.title' hasHTML={true} args={[cartState]} />

      <h2 className='wps-cart-title'>
        <FilterHook name='cart.title.text'>{cartState.title}</FilterHook>
      </h2>

      <FilterHook name='after.cart.title' hasHTML={true} args={[cartState]} />
    </div>
  )
}

export { CartTitle }
