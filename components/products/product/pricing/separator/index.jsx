/** @jsx jsx */
import { jsx, css } from '@emotion/react';

function ProductPricingSeparator() {
  const ProductPricingSeparatorCSS = css`
    margin: 0 3px;
    display: inline-block;
    color: #121212;
  `;

  return (
    <div css={ProductPricingSeparatorCSS} className='wps-product-from-price-separator'>
      –
    </div>
  );
}

export { ProductPricingSeparator };
