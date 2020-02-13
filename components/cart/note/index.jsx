import { ShopContext } from '../../shop/_state/context'
import { useDebounce } from 'use-debounce'

const { useContext, useState, useRef, useEffect } = wp.element

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

  function getNotesLabel() {
    return wp.hooks.applyFilters('default.cart.notes.label', 'Notes:')
  }

  return (
    <section className='wps-cart-notes'>
      <label value='Checkout notes' htmlFor='wps-input-notes'>
        {getNotesLabel()}
      </label>
      <textarea
        placeholder={shopState.settings.general.cartNotesPlaceholder}
        id='wps-input-notes'
        className='wps-input wps-input-textarea'
        onChange={onChange}
      />
    </section>
  )
}

export { CartNote }
