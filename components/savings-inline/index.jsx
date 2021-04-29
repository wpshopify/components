/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import PrettyPrice from '../../common/pricing/pretty';

function SavingsInline({ amount, type, currencyCode }) {
  const SavingsInlineCSS = css`
    font-size: 15px;
    font-weight: normal;
    margin-right: 6px;
  `;

  return type === 'fixed' ? (
    <span css={SavingsInlineCSS}>
      (<PrettyPrice price={amount} currencyCode={currencyCode} /> off)
    </span>
  ) : (
    <span css={SavingsInlineCSS}>({amount}% off)</span>
  );
}

export default SavingsInline;
