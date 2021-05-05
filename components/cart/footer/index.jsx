/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { CartContext } from '../_state/context';
import CartCheckout from '../checkout';
import { CartNote } from '../note';
import { CartTerms } from '../terms';
import Expire from '../../expire';
import CartFooterTotal from './total';

import isEmpty from 'lodash/isEmpty';

const Notices = wp.element.lazy(() =>
  import(/* webpackChunkName: 'Notices-public' */ '../../notices')
);

function CartFooter() {
  const { useContext, useRef } = wp.element;
  const [cartState] = useContext(CartContext);
  const totalElement = useRef();

  const CartFooterCSS = css`
    padding: 1em 0 0 0;
    margin: auto 0 0 0;
    border-top: 1px solid #ddd;
    font-size: 26px;
    color: #121212;

    p {
      margin: 0;
    }

    .wps-total-prefix {
      font-size: 20px;
      color: #121212;
    }

    .wps-notices-cart {
      margin-bottom: 13px;
    }
  `;

  return (
    <>
      <section className='wps-cart-footer' css={CartFooterCSS}>
        {wpshopify.misc.isPro && wpshopify.settings.general.enableCartNotes && <CartNote />}
        {wpshopify.misc.isPro && wpshopify.settings.general.enableCartTerms && <CartTerms />}
        {!isEmpty(cartState.notices) ? (
          cartState.notices[0].type === 'success' ? (
            <Expire delay={3000}>
              <Notices notices={cartState.notices} noticeGroup='cart' />
            </Expire>
          ) : (
            <Notices notices={cartState.notices} noticeGroup='cart' />
          )
        ) : null}
        <CartFooterTotal totalElement={totalElement} />
        <CartCheckout />
      </section>
    </>
  );
}

export default CartFooter;
