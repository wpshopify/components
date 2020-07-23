/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { mq } from '../../../common/css'

function CartClose({ cartDispatch }) {
  function onClose(e) {
    cartDispatch({ type: 'TOGGLE_CART', payload: false })
  }

  const CartCloseButtonCSS = css`
    margin-top: 0;
    line-height: 1;
    position: absolute;
    right: 0;
    top: 0;
    color: #313131;
    border: none;
    background: transparent;
    transition: transform 100ms ease;
    cursor: pointer;
    padding: 30px;
    font-weight: normal;
    font-size: 36px;
    text-align: center;
    white-space: normal;

    &:hover {
      opacity: 0.5;
      background: transparent;
      color: #313131;
    }

    &:focus {
      border: none;
      outline: none;
    }

    span {
      display: inline-block;
      width: 30px;
      height: 30px;
      position: absolute;
      top: calc(50% - 20px);
      left: calc(50% - 10px);
      line-height: 1;
      font-size: 36px;

      ${mq('small')} {
        font-size: 47px;
      }
    }
  `

  return (
    <button
      css={CartCloseButtonCSS}
      className='wps-btn-close wps-modal-close-trigger'
      title={wp.i18n.__('Close Cart', 'wpshopify')}
      onClick={onClose}>
      <span className='wps-modal-close-trigger'>×</span>
    </button>
  )
}

export { CartClose }
