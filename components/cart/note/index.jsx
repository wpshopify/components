import { CartContext } from '../_state/context'
import { useDebounce } from 'use-debounce'
import { FilterHook, __t } from '../../../common/utils'

const { useContext, useState, useRef, useEffect } = wp.element

function CartNote() {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [noteValue, setNoteValue] = useState(() => '')
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

    wpshopify.misc.isPro && cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: debouncedValue })
  }, [debouncedValue])

  return (
    <section className='wps-cart-notes'>
      <label
        value={<FilterHook name='cart.note.label'>{__t('Checkout notes')}</FilterHook>}
        htmlFor='wps-input-notes'>
        <FilterHook name='default.cart.notes.label'>{__t('Notes:')}</FilterHook>
      </label>
      <textarea
        placeholder={
          <FilterHook name='cart.note.placeholder'>
            {__t(wpshopify.settings.general.cartNotesPlaceholder)}
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
