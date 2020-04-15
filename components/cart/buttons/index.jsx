import { CartButton } from './button'
import { v4 as uuidv4 } from 'uuid'

function CartButtons({ buttons }) {
  return (
    <>
      {buttons &&
        buttons.map((buttonOptions) => <CartButton key={uuidv4()} options={buttonOptions} />)}
    </>
  )
}

export default wp.element.memo(CartButtons)
