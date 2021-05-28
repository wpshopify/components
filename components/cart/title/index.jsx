/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { FilterHook } from '../../../common/utils';

function CartTitle({ cartState }) {
  const cartTitleCSS = css`
    color: #333;
    display: inline-block;
    font-weight: bold;
    font-size: 22px;
    line-height: 1.5;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin: 0;

    &:before,
    &:after {
      display: none;
    }
  `;

  return (
    <div className='wps-col-8'>
      <FilterHook name='before.cart.title' hasHTML={true} args={[cartState]} />

      <h2 className='wps-cart-title' css={cartTitleCSS}>
        <FilterHook name='cart.title.text'>{cartState.title}</FilterHook>
      </h2>

      <FilterHook name='after.cart.title' hasHTML={true} args={[cartState]} />
    </div>
  );
}

export { CartTitle };
