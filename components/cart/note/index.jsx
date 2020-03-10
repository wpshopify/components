import { ShopContext } from '../../shop/_state/context'
import { useDebounce } from 'use-debounce'
import { FilterHook } from '../../../common/utils'

const { useContext, useState, useRef, useEffect } = wp.element
const { __ } = wp.i18n

function CartNote() {
  const [shopState, shopDispatch] = useContext(ShopContext)
  const [noteValue, setNoteValue] = useState('')
  const [debouncedValue] = useDebounce(noteValue, 250)
  const isFirstRender = useRef(true)

  function onChange(e) {
    setNoteValue(e.target.value)
  }

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }

    if (wpshopify.misc.isPro) {
      shopDispatch({ type: 'SET_CHECKOUT_NOTE', payload: debouncedValue })
    }
  }, [debouncedValue])

  return (
    <section className='wps-cart-notes'>
      <label
        value={
          <FilterHook name='cart.note.label'>
            {__('Checkout notes', wpshopify.misc.textdomain)}
          </FilterHook>
        }
        htmlFor='wps-input-notes'>
        <FilterHook name='default.cart.notes.label'>
          {__('Notes:', wpshopify.misc.textdomain)}
        </FilterHook>
      </label>
      <textarea
        placeholder={
          <FilterHook name='cart.note.placeholder'>
            {__(shopState.settings.general.cartNotesPlaceholder, wpshopify.misc.textdomain)}
          </FilterHook>
        }
        id='wps-input-notes'
        className='wps-input wps-input-textarea'
        onChange={onChange}
      />
    </section>
  )
}

export { CartNote }
