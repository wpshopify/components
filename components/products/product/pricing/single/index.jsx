import PrettyPrice from '../../../../../common/pricing/pretty';
/** @jsx jsx */
import { jsx, css } from '@emotion/react';

const ProductPriceSingle = React.forwardRef((props, ref) => {
  const priceCSS = css`
    display: inline-block;
    padding: 0;
    margin: 0;
    font-size: ${props.compareAt ? '15px' : '18px'};
    color: ${props.pricingColor ? props.pricingColor : props.compareAt ? '#848484' : '#121212'};
    text-decoration: ${props.compareAt ? 'line-through' : 'none'};
    font-weight: bold;
  `;

  return props.price !== false || props.price !== null ? (
    <span
      ref={ref}
      className='wps-product-individual-price'
      css={priceCSS}
      data-price={props.price}>
      <PrettyPrice price={props.price} currencyCode={props.currencyCode} />
    </span>
  ) : (
    ''
  );
});

export default wp.element.memo(ProductPriceSingle);
