import { FilterHook } from '../../../../common/utils';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function CartLineItemVariantTitle({ lineItem }) {
  const badgeCSS = css`
    display: inline-block;
    width: auto;
    font-weight: 400;
    font-size: 12px;
    margin-bottom: 16px;
    vertical-align: baseline;
    flex: 0 0 100%;
    letter-spacing: 0.02em;
    line-height: 1.4;
    margin: 5px 0 15px 0;
    max-width: 190px;
    white-space: break-spaces;
    text-align: left;
    border-radius: 5px;
    color: black;
    background: #f0f0f0;
    margin-top: 0;
    padding: 0.35em 0.7em;
  `;

  return (
    <div css={badgeCSS} className='wps-cart-lineitem-variant-title'>
      <FilterHook name='cart.lineItem.variant.title'>{lineItem.title}</FilterHook>
    </div>
  );
}

export default wp.element.memo(CartLineItemVariantTitle);
