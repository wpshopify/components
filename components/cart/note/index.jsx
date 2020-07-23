/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartContext } from '../_state/context'
import { useDebounce } from 'use-debounce'

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
    wp.hooks.doAction('on.checkout.note', debouncedValue)
    cartDispatch({ type: 'SET_CHECKOUT_NOTE', payload: debouncedValue })
  }, [debouncedValue])

  const CartNotesCSS = css`
    margin-bottom: 0.5em;
    padding: 0;

    .wps-input {
      width: 100%;
      display: block;
      font-size: 16px;
      padding: 10px;
      border-color: #313131;
      appearance: none;
      font-family: inherit;
      border-radius: 5px;
    }

    label {
      font-size: 16px;
    }
  `

  return (
    <section className='wps-cart-notes' css={CartNotesCSS}>
      <label htmlFor='wps-input-notes'>
        {wp.hooks.applyFilters(
          'default.cart.notes.label',
          wp.i18n.__('Checkout notes', 'wpshopify'),
          cartState
        )}
      </label>
      <textarea
        placeholder={wp.hooks.applyFilters(
          'cart.note.placeholder',
          wpshopify.settings.general.cartNotesPlaceholder,
          cartState
        )}
        id='wps-input-notes'
        className='wps-input wps-input-textarea'
        onChange={onChange}
      />
    </section>
  )
}

export { CartNote }
