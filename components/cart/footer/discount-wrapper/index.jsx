/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { CartContext } from '../../_state/context'
import { addDiscountCode, removeDiscountCode } from '../../_common'
import CartFooterDiscount from '../discount'
import { Loader } from '../../../loader'
import to from 'await-to-js'

function CartFooterDiscountWrapper({ discountCode }) {
  const { useRef, useState, useContext } = wp.element
  const { Notice } = wp.components
  const [cartState, cartDispatch] = useContext(CartContext)
  const discountInputRef = useRef(false)
  const [isLoading, setIsLoading] = useState(false)

  const [notice, setNotice] = useState()

  const footerStyles = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `

  const discountFormCSS = css`
    display: flex;
    width: 100%;
    margin-bottom: 20px;
  `

  const discountFormInputCSS = css`
    appearance: none;
    background: transparent;
    flex: 1;
    font-size: 16px;
    padding: 10px;
    margin-right: 10px;
    border-radius: 5px;
    border: 1px solid #313131;
    outline: none;
    box-shadow: none;

    &:disabled {
      &:hover {
        cursor: not-allowed;
      }
    }
  `

  const discountFormButtonCSS = css`
    width: 100px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid #313131;
    appearance: none;
    color: black;
    background: white;

    &:hover {
      cursor: ${isLoading ? 'not-allowed' : 'pointer'};
      color: rgba(0, 0, 0, 0.5);
    }

    &:focus {
      outline: none;
    }

    &:disabled {
      color: #c4c4c4;

      &:hover {
        cursor: not-allowed;
      }
    }

    .ball-pulse > div {
      background: black !important;
      width: 8px !important;
      height: 8px !important;
    }
  `

  async function addDiscountCodeWrapper() {
    setNotice(false)
    setIsLoading(true)

    const [error, success] = await to(
      addDiscountCode(cartState, cartDispatch, discountInputRef.current.value)
    )

    setIsLoading(false)

    if (error) {
      setNotice(error)
    }
  }

  function onClick(e) {
    addDiscountCodeWrapper()
  }

  function onRemoval() {
    /* @if NODE_ENV='pro' */
    removeDiscountCode(cartDispatch)
    /* @endif */
  }

  const discountNoticeCSS = css`
    margin-bottom: 1em;
    margin-top: -10px;
  `

  return (
    <>
      <div css={footerStyles}>
        {!discountCode && (
          <div css={discountFormCSS}>
            <input
              type='text'
              placeholder='Discount code'
              ref={discountInputRef}
              css={discountFormInputCSS}
              disabled={isLoading || cartState.isCartEmpty}
            />
            <button
              css={discountFormButtonCSS}
              onClick={onClick}
              disabled={isLoading || cartState.isCartEmpty}>
              {!isLoading && <span>Apply</span>}
              {isLoading && <Loader />}
            </button>
          </div>
        )}

        {discountCode && <CartFooterDiscount discountCode={discountCode} onRemoval={onRemoval} />}
      </div>

      {notice && (
        <div css={discountNoticeCSS}>
          <Notice isDismissible={false} status='warning'>
            {notice}
          </Notice>
        </div>
      )}
    </>
  )
}

export default CartFooterDiscountWrapper
