import { CartButton } from './button'
import uuidv4 from 'uuid/v4'

function CartButtons({ buttons }) {
  return (
    <>
      {buttons.map(buttonOptions => (
        <CartButton key={uuidv4()} options={buttonOptions} />
      ))}
    </>
  )
}

export default wp.element.memo(CartButtons)
