import { CartContext } from '../_state/context'
/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { flexRowCSS } from '../../../common/css'
import { __t } from '../../../common/utils'

const { useContext, useState, useEffect } = wp.element

function CartTerms() {
  const [cartState, cartDispatch] = useContext(CartContext)
  const [isChecked, setIsChecked] = useState(() => false)

  useEffect(() => {
    cartDispatch({ type: 'SET_TERMS_ACCEPTED', payload: false })
  }, [])

  function termsLabel() {
    return {
      __html: __t(wpshopify.settings.general.cartTermsContent),
    }
  }

  function onChange(e) {
    setIsChecked(!isChecked)

    if (wpshopify.misc.isPro) {
      cartDispatch({ type: 'SET_TERMS_ACCEPTED', payload: !isChecked })
    }
  }

  var containerCSS = css`
    margin: 0.5em 0 1em 0;
  `

  var labelCSS = css`
    padding-left: 10px;
    position: relative;
    width: 100%;
    text-transform: initial;
    display: inline-block;
    vertical-align: middle;
    cursor: pointer;
    margin: 0;
    font-size: 16px;
  `

  return (
    <section className='wps-cart-terms' css={containerCSS}>
      <div className='wps-input-row' css={flexRowCSS}>
        <input
          onChange={onChange}
          id='wps-input-terms'
          defaultChecked={isChecked}
          type='checkbox'
          className='wps-input wps-input-checkbox'
        />
        <label
          dangerouslySetInnerHTML={termsLabel()}
          htmlFor='wps-input-terms'
          className='wps-input-label wps-input-terms'
          css={labelCSS}
        />
      </div>
    </section>
  )
}

export { CartTerms }
