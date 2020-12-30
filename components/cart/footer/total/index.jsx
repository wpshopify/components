/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { fadeInRightSlow, useAnime } from '../../../../common/animations';
import { CartContext } from '../../_state/context';
import CartFooterSubtotalLabel from '../subtotal';
import CartFooterSubtotalAmount from '../subtotal-amount';
import CartFooterDiscountWrapper from '../discount-wrapper';
import { getCurrencyCodeFromPayload } from '../../../../common/pricing/data';

function CartFooterTotal({ totalElement }) {
  const { useContext, useEffect } = wp.element;
  const animeFadeInRightSlow = useAnime(fadeInRightSlow);
  const [cartState] = useContext(CartContext);

  const footerStyles = css`
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0;
  `;

  useEffect(() => {
    if (!cartState.total) {
      return;
    }
    animeFadeInRightSlow(totalElement.current);
  }, [cartState.total]);

  return (
    <>
      {wpshopify.misc.isPro && wpshopify.settings.general.enableDiscountCodes && (
        <CartFooterDiscountWrapper discountCode={cartState.discountCode} />
      )}

      <div css={footerStyles}>
        <CartFooterSubtotalLabel />
        <CartFooterSubtotalAmount
          beforeDiscountTotal={cartState.beforeDiscountTotal}
          discountCode={cartState.discountCode}
          total={cartState.total}
          currencyCode={getCurrencyCodeFromPayload(cartState.checkoutCache)}
          totalElement={totalElement}
        />
      </div>
    </>
  );
}

export default wp.element.memo(CartFooterTotal);
